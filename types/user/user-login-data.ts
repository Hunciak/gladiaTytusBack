export interface UserLoginData {
    name?: string;
    email: string;
    password: string;


}

export interface SingleUserEntity extends UserLoginData {
    strength: number;
    dexterity: number;
    stamina: number;
    charisma: number;
}

export interface AllUserStats {
    name: string;
    strength: number;
    dexterity: number;
    stamina: number;
    charisma: number;
    PLN: number;
}