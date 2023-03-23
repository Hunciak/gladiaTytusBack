import {Router} from "express";
import {UserRecord} from "../records/user.record";


export const AppRouter = Router()

    .get('/user/:id', async (req, res) => {
        console.log('jestem tutaj')
        console.log(req.body.params.id)
        const getUser = await UserRecord.getUser(req.body.params.id);
        res.json(getUser);
    })