export interface UserLoginData {
    name?: string;
    id: string;
    email: string;
    password: string;


}

export interface SingleUserEntity extends UserLoginData {
    strength: number;
    dexterity: number;
    stamina: number;
    charisma: number;
    level: number;
    averageDamage: number;
    chanceOnHit: number;
    damageReduction: number;
    HP: number;
}

export interface AllUserStats {
    name: string;
    level: number;
    experience: number;
    strength: number;
    dexterity: number;
    stamina: number;
    charisma: number;
    PLN: number;
    averageDamage: number;
    chanceOnHit: number;
    damageReduction: number;
}

export interface AllEquipment {
    chest: string;
    helmet: string;
    gloves: string;
    shoes: string;
    ring: string;
    necklace: string;
    erring: string;
    weapon: string;
}

export interface AllOpponentStats {
    name: string;
    hp: number;
    tier: number;
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