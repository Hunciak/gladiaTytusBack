export interface UserEntity {
    name?: string;
    email: string;
    password: string;


}

export interface SingleUserEntity extends UserEntity {
    strength: number;
    dexterity: number;
    stamina: number;
    charisma: number;
}