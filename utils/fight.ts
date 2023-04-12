import {
    AllOpponentStats,
    FightResType,
    SingleUserEntity,
    UserCombatStatsType,
    UserOppIdType
} from "../types/user/user-login-data";
import {pool} from "./db";
import {FieldPacket} from "mysql2";
import {UserRecord} from "../records/user.record";

type StatsResult = [AllOpponentStats[], FieldPacket[]]
type UserRecordResult = [SingleUserEntity[], FieldPacket[]];
type UserCombatResult = [UserCombatStatsType[], FieldPacket[]]

const hit = (percentageHit: number) => {
    const randomValue = Math.floor(Math.random() * 100 + 1)
    return (percentageHit >= randomValue ? 1 : 0)
}


export const fight = async (data: UserOppIdType): Promise<FightResType> => {
    console.log(data)
    const [user] = await pool.execute("SELECT name, level, experience, HP, strength, dexterity, stamina, charisma, PLN   FROM `users` WHERE id = :id", {
        id: data.id,
    }) as UserRecordResult;

    const [userCombat] = await pool.execute("SELECT damage, chanceOnHit, damageReduction from `users_combat_stats` WHERE id = :id", {
        id: data.id,
    }) as UserCombatResult;

    const userStats = user[0];
    const usersCombatStats = userCombat[0];
    const oppStats = await UserRecord.getOpponent(data.opponentId)

    let userHp: number = userStats.HP;
    let oppHp: number = oppStats.hp;
    let userHits: number = 0;
    let oppHits: number = 0;
    let goldRoll: number = Math.floor(Math.random() * oppStats.maxGold)
    let totalGold: number = userStats.PLN + goldRoll
    let win: boolean = false;

    if (userHp !== 0 || userHits > oppHits) {
        console.log('id', data.id)
        await UserRecord.addGold(data.id, totalGold)
        win = true;
    }

    const fightLog: [string] = ['Twój log walki']


    for (let i = 0; i < 20; i++) {
        if (userHp > 0 && oppHp > 0) {
            let oppHit = oppStats.damage * hit(oppStats.chanceOnHit) * userStats.charisma / 10;
            let userHit = usersCombatStats.damage * hit(usersCombatStats.chanceOnHit) * oppStats.damageReduction / 10;
            userHp = userHp - oppHit;
            oppHp = oppHp - userHit;
            userHits = userHits + userHit;
            oppHits = oppHits + oppHit;
            fightLog.push(`W rundzie ${i + 1} zadałeś ${userHit} obrażeń dla ${oppStats.name}!`);
            fightLog.push(`W rundzie ${i + 1} ${oppStats.name} zadał Ci ${oppHit} obrażeń !`);
        } else if (userHp <= 0) {
            fightLog.push(`Przegrałeś, straciłeś wszystkie punkty życia!`);
        } else if (oppHp <= 0) {
            fightLog.push(`${oppStats.name}, zginął, stracił wszystkie punkty życia!`);
        }
    }
    return {
        win,
        userLog: fightLog,
        userHp,
        oppHp,
        gold: goldRoll,
    }
}