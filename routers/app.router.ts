import {Router} from "express";
import {UserRecord} from "../records/user.record";


export const AppRouter = Router()

    .get('/user/:id', async (req, res) => {
        console.log('jestem tutaj', req.params.id)
        const getUser = await UserRecord.getUser(req.params.id);
        res.json(getUser);
        console.log('get user:',getUser)
    })

    .get('/opp/:opponentId', async (req, res) => {
        console.log('jestem tutaj', req.params.opponentId)
        const getOpponent = await UserRecord.getOpponent(req.params.opponentId);
        res.json(getOpponent);
        console.log('get Opponent:',getOpponent)
    })

