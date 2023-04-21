import { databaseQuery } from "./database";
import { Role } from "./types";

const createUser = (name: string, password: string, role: keyof typeof Role) => {
    databaseQuery(`CALL createUser('${name}', '${password}', '${role}')`);
}

export {
    createUser
}