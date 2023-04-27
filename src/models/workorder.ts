import { connectDatabase, queryDatabase } from "./database";
import { States, Task, Vehicle, type WorkOrder } from "./types";

const getWorkOrders = () => {
    return new Promise<WorkOrder[]>(resolve => {
        queryDatabase(`
            SELECT
                wo.id,
                v.image as vehicle_image,
                v.model,
                v.licenseplate,
                s.name as state,
                wo.entrydate,
                wo.departuredate,
                client.id as clientid,
                client.name as clientname,
                adviser.name as creator
            FROM
                WorkOrders wo JOIN
                Vehicles v ON wo.vehicleid = v.id JOIN
                States s ON wo.stateid = s.id JOIN
                Users client ON wo.clientid = client.id JOIN
                Users adviser ON wo.advisercreatorid = adviser.id
    `)
        .then(({ rows }) => {
            resolve(rows.map(row => {
                const client = {
                    id: row.clientid,
                    name: row.clientname
                };
                return {
                    id: row.id,
                    vehicle: {
                        image: row.vehicle_image,
                        model: row.model,
                        licenseplate: row.licenseplate,
                        owner: client
                    },
                    state: row.state,
                    entry: row.entrydate.toLocaleDateString(),
                    departure: row.departuredate ? row.departuredate.toLocaleDateString() : "Ahora",
                    client,
                    adviser: row.creator
                }
            }));
        });
    });
}

const saveWorkorder = (advicerID: number, clientID: number, vehicle: Vehicle, tasks: Task[]) => {
    return new Promise<void>(resolve => {
        connectDatabase(async connection => {
            const { rows: vehicleRows } = await connection.query(`SELECT createVehicle(
                '${vehicle.model}',
                '${vehicle.licenseplate}',
                '${vehicle.image}',
                ${vehicle.year},
                ${clientID}
            )`);
            const [{ createvehicle: vehicleID }] = vehicleRows;

            const { rows: workorderRows } = await connection.query(`SELECT createWorkOrder(
                ${advicerID},
                ${clientID},
                ${vehicleID}
            );`);
            const [{ createworkorder: workorderID }] = workorderRows;

            const { rows: stateRows } = await connection.query(`
                SELECT id
                FROM States
                WHERE name = '${States.PENDING}';
            `);
            const [{ id: stateID }] = stateRows;

            const insertionTasksQuery = tasks.map(t => `
                INSERT INTO Tasks(name, description, day, technicianID, workorderID, stateID)
                VALUES (
                    '${t.name}',
                    '${t.description}',
                    '${t.day.toISOString()}',
                    ${t.technician?.id},
                    ${workorderID},
                    ${stateID}
                );
            `).join("/n");
            await connection.query(insertionTasksQuery);
            await connection.end();
            resolve();
        });
    });
}

export {
    saveWorkorder,
    getWorkOrders
}