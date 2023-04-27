import { queryDatabase } from "./database";
import { type User } from "./types";

const getUserToken = async (name: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        queryDatabase(`SELECT generateUserToken('${name}', '${password}')`)
        .then(({ rows }) => {
            const [{ generateusertoken }] = rows;
            resolve(generateusertoken);
        })
        .catch(reject);
    });
}

const isTokenValid = (authtoken: string) => {
    return new Promise<User>((resolve, reject) => {
        const query = `
            SELECT u.id, u.name
            FROM Tokens t, Users u
            WHERE token = '${authtoken}' AND t.userID = u.id
        `;
        queryDatabase(query).then(({ rows, rowCount }) => {
            if(rowCount > 0){
                const [{ id, name }] = rows;
                resolve({ id, name });
            } else reject(null);
        });
    });
}

export {
    getUserToken,
    isTokenValid
}