import { Pool, QueryResult } from "pg";

const databaseQuery = (query: string) => {
    return new Promise<QueryResult<any>>((resolve, reject) => {
        const connection = new Pool({connectionString: process.env.DATABASE_CONNECTION_STRING});
        connection.query(query).then(resolve).catch(reject);
        connection.end();
    });
}

export {
    databaseQuery
}