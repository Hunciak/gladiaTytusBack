import { Router } from "express";
import {UserRecord} from "../records/user.record";




export const signInRouter = Router()

    .post('/', async (req, res) => {
        const signIn = await UserRecord.logIn(req.body.email, req.body.password);
        res.json({
            signIn,
        });
    });