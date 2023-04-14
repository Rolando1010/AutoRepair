import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const connection = new Pool({connectionString: process.env.DATABASE_CONNECTION_STRING});
    response.json(await connection.query("SELECT * FROM test"));
    connection.end();
}