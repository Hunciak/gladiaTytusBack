import {Router} from "express";
import {UserRecord} from "../records/user.record";


export const AppRouter = Router()

    .get('/user/:id', async (req, res) => {
        const getUser = await UserRecord.getUser(req.params.id);
        res.json(getUser);
        console.log('get user:',getUser)
    })

    .get('/opp/:opponentId', async (req, res) => {
        const getOpponent = await UserRecord.getOpponent(req.params.opponentId);
        res.json(getOpponent);
    })

    .get('/user/eq/:id', async (req, res) => {
        const getEquipment = await UserRecord.getEquipment(req.params.id);
        console.log('get user:',getEquipment)
    })

