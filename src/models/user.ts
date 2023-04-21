import { databaseQuery } from "./database";
import { Role, type User } from "./types";

const createUser = (name: string, password: string, role: keyof typeof Role) => {
    databaseQuery(`CALL createUser('${name}', '${password}', '${role}')`);
}

const getClients = (): Promise<User[]> => {
    return new Promise(resolve => {
        databaseQuery("SELECT u.* FROM Users u, Roles r WHERE u.roleID = r.id and r.name = 'client'")
        .then(({ rows }) => {
            resolve(rows.map(row => ({
                id: row.id,
                name: row.name
            })));
        });
    })
}

export {
    createUser,
    getClients
}