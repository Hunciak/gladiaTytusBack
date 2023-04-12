import exp from "constants";

export interface UserLoginData {
    name: string;
    id?: string;
    email: string;
    password: string;
}

export interface UserDataType {
    email: string,
    name?: string,
    password: string,
}

export interface SingleUserEntity extends UserLoginData {
    name: string;
    strength: number;
    dexterity: number;
    stamina: number;
    charisma: number;
    level: number;
    HP?: number;
    PLN?: number;
}

export interface AddStatsType {
    name: string;
    level: number;
    experience: number;
    HP: number;
    damage: number;
    chanceOnHit: number;
    damageReduction: number;
    strength: number;
    dexterity: number;
    stamina: number;
    charisma: number;
    PLN: number;
}

export interface AllEquipment {
    name: string;
    type: string;
    tier: number;
    stats_attack: number;
    stats_defence: number;
    stats_strength: number;
    stats_stamina: number;
    stats_dexterity: number;
    stats_charisma: number;
}

export interface AllOpponentStats {
    name: string;
    hp: number;
    tier?: number;
    damage: number;
    chanceOnHit: number;
    damageReduction: number;
    maxGold: number;
}

export interface AddStatsValidationType {
    id:string;
    strength: number;
    dexterity: number;
    stamina: number;
    charisma: number;
    PLN: number;
}

export interface UserOppIdType {
    id: string ;
    opponentId: number;
}

export interface UserCombatStatsType {
    damage: number;
    chanceOnHit: number;
    damageReduction: number;

}

export interface AllOppType {
    id: number,
    name: string
}

export interface FightResType {
    win: boolean,
    userLog: [string],
    userHp: number
    oppHp: number
    gold: number
}