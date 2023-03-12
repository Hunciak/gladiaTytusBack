import { Router } from "express";
import {UserRecord} from "../records/user.record";



export const userRouter = Router()

    .get('/:id', async (req, res) => {
        const user = await UserRecord.getUser(req.params.id);
        res.json(user);
    })

    .post('/', async (req, res) => {
        const user = new UserRecord(req.body);
        await user.insert();
        res.json(user);
    })