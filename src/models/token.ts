import { Pool } from "pg";

const getUserToken = async (name: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const connection = new Pool({connectionString: process.env.DATABASE_CONNECTION_STRING});
        connection.query(`SELECT generateUserToken('${name}', '${password}')`)
        .then(({ rows }) => {
            const [{ generateusertoken }] = rows;
            resolve(generateusertoken);
        })
        .catch(reject);
        connection.end();
    });
}

export {
    getUserToken
}