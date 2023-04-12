import {
    AddStatsValidationType,
    AllEquipment,
    AllOpponentStats, FightResType,
    SingleUserEntity,
    UserLoginData, UserOppIdType
} from "../types";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";

import {bcrypt, comparePassword} from "../utils/bcrypt";
import {fight} from "../utils/fight";
import {addStatsValidation} from "../utils/addStatsValidation";



type UserRecordResult = [SingleUserEntity[], FieldPacket[]];
type EquipmentRecordResult = [AllEquipment[], FieldPacket[]];
type OpponentRecordResult = [AllOpponentStats[], FieldPacket[]]


export class UserRecord implements UserLoginData {
    id: string;
    name: string;
    email: string;
    password: string;

    constructor(obj: UserLoginData) {
        if (!obj.name || obj.name.length > 30) {
            throw new ValidationError('Nazwa użytkowanika nie może być pusta, ani przekraczać 30 znaków.')
        }

        if (!obj.email || !obj.email.includes('@')) {
            throw new ValidationError('Email użytkownika nie moży być pysty lub podana nazwa nie jest emailem')
        }

        if (!obj.password || obj.password.length <= 8 || obj.password.length >= 30) {
            throw new ValidationError('Hasło użytkownika nie może być puste oraz zawierać od 8 do 30 znaków')
        }

        this.name = obj.name;
        this.email = obj.email;
        this.password = obj.password;

    }

    static async getUser(id:string): Promise<SingleUserEntity | Error> {
        const [results] = await pool.execute("SELECT name, level, experience, HP, strength, dexterity, stamina, charisma, PLN   FROM `users` WHERE id = :id", {
            id,
        }) as UserRecordResult;

        return results.length !== 0 ? results[0] : new Error('No data of given id');
    }

    static async logIn(email: string, password: string): Promise<string | null> {
        const [getId] = await pool.query("SELECT id, password FROM users WHERE email = :email", {
            email,
        }) as UserRecordResult;

       return getId.length === 0 ? null : (await comparePassword(password, getId[0].password) ?  getId[0].id : null)
    }

    static async getEquipment(id: string):Promise<AllEquipment[] | null> {

        const [getEq] = await pool.execute("SELECT name, type, tier, stats_attack, stats_defence, stats_strength, stats_charisma FROM items WHERE id IN (SELECT itemId from users_items WHERE userId = :id)", {
            id}) as EquipmentRecordResult
        return getEq.length === 0 ? null : getEq;
    }

    static async getOpponent(opponentId: number | string): Promise<AllOpponentStats> {
        console.log(opponentId)
        const [getOpp] = await pool.execute("SELECT name, hp, tier, damage, chanceOnHit, damageReduction, maxGold from `opponents` WHERE id = :opponentId", {
            opponentId
        }) as OpponentRecordResult;
        return getOpp.length === 0 ? null : getOpp[0];
    }

    static async updateStats(stats: AddStatsValidationType): Promise<void> {
        await pool.execute("UPDATE users SET strength = :strength, dexterity = :dexterity, stamina = :stamina, charisma = :charisma, PLN = :PLN WHERE id = :id", {
            id: stats.id,
            strength: stats.strength,
            dexterity: stats.dexterity,
            stamina: stats.stamina,
            charisma: stats.charisma,
            PLN: stats.PLN,
        })
    }

    async insert(): Promise<void | string> {
        if (!this.id) {
            this.id = uuid()
            this.password = await bcrypt(this.password)

        } else {
            throw new Error('Cannot insert something that is already inserted!')
        }

        await pool.execute("INSERT INTO `users`(`id`, `name`, `email`, `password`) VALUES(:id, :name, :email, :password)", this)
    }

    static async addGold(id: string, amount: number): Promise<void> {

        await pool.execute("UPDATE users SET PLN = :amount WHERE id = :id", {
            id,
            amount,
        })
    }

    static async getAllOpponents(): Promise<string[] | null> {
        const [getAll] = await pool.execute("SELECT id, name FROM opponents") as any
        return getAll.length === 0 ? null : getAll;
    }

    static async fightModule(data: UserOppIdType): Promise<FightResType | null> {
        const fightRes = await fight(data)
        return fightRes ? fightRes : null;


    }

    static async addStats(data: AddStatsValidationType): Promise<string> {
        await addStatsValidation(data)
        return "Dodano statystyki"
    }
}