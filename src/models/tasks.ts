import { queryDatabase } from "./database";
import { type Task } from "./types";

const getTechnicianTasks = (technicianID: number, month: number, year: number) => {
    return new Promise<Task[]>(resolve => {
        queryDatabase(`
            SELECT t.name, t.description, t.day, s.name as state
            FROM Tasks t, States s
            WHERE
                technicianID = ${technicianID} AND
                MONTH(day) = ${month} AND
                YEAR(day) = ${year} AND
                t.stateID = s.id
        `).then(({ rows }) => resolve(rows.map(row => ({
            name: row.name,
            description: row.description,
            day: row.day,
            state: row.state
        }))));
    });
}

export {
    getTechnicianTasks
}