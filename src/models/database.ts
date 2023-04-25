import { Pool, QueryResult } from "pg";

const connectDatabase = (callback: (connection: Pool) => void) => {
    const connection = new Pool({connectionString: process.env.DATABASE_CONNECTION_STRING});
    callback(connection);
}

const queryDatabase = (query: string) => {
    return new Promise<QueryResult<any>>((resolve, reject) => {
        connectDatabase(connection => {
            connection
                .query(query)
                .then(resolve)
                .catch(reject)
                .finally(() => connection.end());
        });
    });
}

export {
    connectDatabase,
    queryDatabase
}