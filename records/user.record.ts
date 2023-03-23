import {SingleUserEntity, UserLoginData} from "../types/user/user-login-data";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";

import {bcrypt, comparePassword} from "../utils/bcrypt";
import {compare} from "bcrypt";


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

    static async getUser(id:string): Promise<UserRecordResult | null | any> {
        const [results] = await pool.execute("SELECT name, strength, dexterity, stamina, charisma  FROM `users` WHERE id = :id", {
            id,
        }) as UserRecordResult;
        console.log(results)
        return results.length === 0 ? null : new UserRecord(results[0]);
    }

    static async logIn(email: string, password: string): Promise<Boolean | null> {

        const [results] = await pool.query("SELECT id password FROM users WHERE email = :email", {
            email,
        }) as UserRecordResult;

       return results.length === 0 ? null : await comparePassword(password, results[0].password)
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