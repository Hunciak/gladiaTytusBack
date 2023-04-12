import {SingleUserEntity} from "../types/user/user-login-data";
import {pool} from "./db";

export const getPercentageValue = async (firstParam: number, secondParam: number = 0): Promise<SingleUserEntity | number> => {
    return (Math.floor(firstParam / 10) + secondParam)
};

export const getHP = async (stamina: number, level: number): Promise<number> => {
    return stamina * 5 + level * 15;
};

