import { queryDatabase } from "./database";
import { Role, type User } from "./types";

const createUser = (name: string, password: string, role: Role) => {
    queryDatabase(`CALL createUser('${name}', '${password}', '${role}')`);
}

const getUserByRoles = (roles: Role[]): Promise<User[]> => {
    return new Promise(resolve => {
        queryDatabase(`
            SELECT u.id, u.name, r.name as role
            FROM Users u, Roles r
            WHERE u.roleID = r.id AND r.name IN ('${roles.join("','")}')
        `).then(({ rows }) => {
            resolve(rows.map(row => ({
                id: row.id,
                name: row.name,
                role: row.role
            })));
        });
    })
}

export {
    createUser,
    getUserByRoles
}