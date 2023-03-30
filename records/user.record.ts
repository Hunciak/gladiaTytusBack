import {AllUserStats, SingleUserEntity, UserLoginData} from "../types/user/user-login-data";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";

import {bcrypt, comparePassword} from "../utils/bcrypt";
import {compare} from "bcrypt";
import {getHP, getPercentageValue} from "../utils/statsModule";


type UserRecordResult = [SingleUserEntity[], FieldPacket[]];


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
        console.log('am I here?', id)
        const [results] = await pool.execute("SELECT name, level, experience, HP, strength, dexterity, stamina, charisma, PLN   FROM `users` WHERE id = :id", {
            id,
        }) as UserRecordResult;
        console.log(results[0]);
        // const averageDamage = getPercentageValue(results[0].strength, 5);
        // const damageReduction = getPercentageValue(results[0].dexterity, results[0].level);
        // const HP = getHP(results[0].stamina, results[0].level);
        // const chanceOnHit = getPercentageValue(results[0].dexterity, results[0].level)
        // const gowno = [results[0], averageDamage, damageReduction, HP, chanceOnHit]

        return results.length !== 0 ? results[0] : new Error('No data of given id');
    }

    static async logIn(email: string, password: string): Promise<string | null> {
        const [getId] = await pool.query("SELECT id, password FROM users WHERE email = :email", {
            email,
        }) as UserRecordResult;
        console.log('wynik z logina', getId.length)
       return getId.length === 0 ? null : (await comparePassword(password, getId[0].password) ?  getId[0].id : null)
    }

    static async getOpponent(opponentId: string): Promise<any> {
        console.log('jestem w getOpponent w dupie', opponentId)
        const [results] = await pool.execute("SELECT name, hp, tier, damage, chanceOnHit, damageReduction, maxGold from `opponents` WHERE id = :opponentId", {
            opponentId
        }) as any;
        console.log('wynik:', results)
        return results[0]
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

}