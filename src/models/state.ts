import { queryDatabase } from "./database";
import { State } from "./types";

const getStateID = (state: State) => {
    return new Promise<number>(resolve => {
        queryDatabase(`
            SELECT id
            FROM States
            WHERE name = '${state}';
        `).then(({ rows }) => {
            resolve(rows[0].id);
        });
    });
}

export {
    getStateID
}