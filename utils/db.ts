import {createPool} from "mysql2/promise";


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_gladia_tytus',
    namedPlaceholders: true,
    decimalNumbers: true,
});