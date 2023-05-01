import { connectDatabase, queryDatabase } from "./database";
import { type User } from "./types";

const verifyCredentials = async (name: string, password: string) => {
    return new Promise<{authtoken: string, user: User}>((resolve, reject) => {
        connectDatabase(connection => {
            connection
            .query(`SELECT generateUserToken('${name}', '${password}')`)
            .then(({rows: [{ generateusertoken: authtoken }]}) => {
                connection.query(`
                    SELECT u.id, u.name, r.name as role
                    FROM
                        Users u JOIN
                        Tokens t ON t.userID = u.id JOIN
                        Roles r ON r.id = u.roleID
                    WHERE t.token = '${authtoken}'
                `).then(({rows: [userRow]}) => {
                    resolve({authtoken, user: {
                        id: userRow.id,
                        name: userRow.name,
                        role: userRow.role
                    }});
                });
            }).catch(reject);
        });
    });
}

const isTokenValid = (authtoken: string) => {
    return new Promise<User | null>((resolve) => {
        const query = `
            SELECT u.id, u.name
            FROM Tokens t, Users u
            WHERE t.token = '${authtoken}' AND t.userID = u.id
        `;
        queryDatabase(query).then(({ rows, rowCount }) => {
            if(rowCount > 0){
                const [{ id, name }] = rows;
                resolve({ id, name });
            } else resolve(null);
        });
    });
}

export {
    verifyCredentials,
    isTokenValid
}