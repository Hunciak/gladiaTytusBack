import {AddStatsValidationType} from "../types";
import {pool} from "./db";
import {FieldPacket} from "mysql2";
import {ValidationError} from "./errors";
import {UserRecord} from "../records/user.record";

type StatsValidationResult = [AddStatsValidationType[], FieldPacket[]]

export const addStatsValidation = async (stats: AddStatsValidationType) => {

    const [baseStats] = await pool.execute("SELECT id, strength, dexterity, stamina, charisma, PLN FROM `users` WHERE id = :id", {
        id: stats.id,
    }) as StatsValidationResult
    const bStats = baseStats[0];
    const goldForStats = ((stats.strength + stats.dexterity + stats.stamina + stats.charisma) - (bStats.strength + bStats.stamina + bStats.dexterity + bStats.charisma)) * 3;
    const userGold = bStats.PLN - stats.PLN
    if (stats.id === bStats.id && goldForStats === userGold) {
            await UserRecord.updateStats(stats)
        } else {
        return new ValidationError('Wystąpił błąd podczas walidacji przesłanych statystyk')
    }
}