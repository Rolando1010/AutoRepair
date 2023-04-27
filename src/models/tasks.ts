import { queryDatabase } from "./database";
import { type Task } from "./types";

// meter usuario en vehículo cómo opcional y terminar joins
const getTechnicianTasks = (technicianID: number, month: number, year: number) => {
    return new Promise<Task[]>(resolve => {
        queryDatabase(`
            SELECT
                t.id, t.name, t.description, t.day, s.name as state,
                v.model, v.licenseplate, v.image, v.year,
                u.id as userid, u.name as username
            FROM
                Tasks t JOIN
                States s ON t.stateID = s.id JOIN 
                WorkOrders wo ON t.workorderID = wo.id JOIN
                Vehicles v ON v.id = wo.vehicleID JOIN
                Users u ON u.id = wo.clientID
            WHERE
                t.technicianID = ${technicianID} AND
                date_part('month',t.day) = ${month} AND
                date_part('year',t.day) = ${year}
        `).then(({ rows }) => resolve(rows.map(row => {
            return {
                id: row.id,
                name: row.name,
                description: row.description,
                day: row.day,
                state: row.state,
                vehicle: {
                    model: row.model,
                    licenseplate: row.licenseplate,
                    image: row.image,
                    year: row.year,
                    owner: {
                        id: row.userid,
                        name: row.username
                    }
                }
            }
        })));
    });
}

export {
    getTechnicianTasks
}