import {Router} from "express";
import {UserRecord} from "../records/user.record";


export const registrationRouter = Router()

    .post('/', async (req, res) => {
        console.log('jestem w /signup', res.json)
        const user = new UserRecord(req.body);
        await user.insert();
        res.json(user);
    });

