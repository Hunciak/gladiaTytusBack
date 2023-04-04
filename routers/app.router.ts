import {Router} from "express";
import {UserRecord} from "../records/user.record";



export const AppRouter = Router()

    .get('/user/:id', async (req, res) => {
        const getUser = await UserRecord.getUser(req.params.id);
        res.json(getUser);
    })

    .get('/opp/:opponentId', async (req, res) => {
        const getOpponent = await UserRecord.getOpponent(req.params.opponentId);
        res.json(getOpponent);
    })

    .get('/user/eq/:id', async (req, res) => {
        const getEquipment = await UserRecord.getEquipment(req.params.id);
        res.json(getEquipment);
    })

    .get('/allopp', async (req, res) => {
        const getAllOpponents = await UserRecord.getAllOpponents();
        res.json(getAllOpponents);
        console.log(getAllOpponents)
    })

    .post('user/eq/addGold', async (req, res) => {
        const addGold = await UserRecord.addGold(req.body.id, req.body.amount);
        res.json(addGold)
    })

