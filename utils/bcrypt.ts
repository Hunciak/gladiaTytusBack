import {hash} from 'bcrypt';


export const bcrypt = async (plaintextPassword: string, SALT: number) =>  {
    return await hash(plaintextPassword, SALT);
};