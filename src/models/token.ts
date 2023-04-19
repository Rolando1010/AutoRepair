import { databaseQuery } from "./database";

const getUserToken = async (name: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        databaseQuery(`SELECT generateUserToken('${name}', '${password}')`)
        .then(({ rows }) => {
            const [{ generateusertoken }] = rows;
            resolve(generateusertoken);
        })
        .catch(reject);
    });
}

const isTokenValid = (authtoken: string) => {
    return new Promise<boolean>(resolve => {
        const query = `SELECT id FROM Tokens WHERE token = '${authtoken}'`;
        databaseQuery(query).then(({ rowCount }) => {
            resolve(rowCount > 0);
        });
    });
}

export {
    getUserToken,
    isTokenValid
}