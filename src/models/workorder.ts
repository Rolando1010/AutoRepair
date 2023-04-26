import { connectDatabase, queryDatabase } from "./database";
import { States, Task, Vehicle, type WorkOrder } from "./types";

const getWorkOrders = () => {
    return new Promise<WorkOrder[]>(resolve => {
        queryDatabase("SELECT * FROM getWorkOrders")
        .then(({ rows }) => {
            resolve(rows.map(row => {
                return {
                    id: row.id,
                    vehicle: {
                        image: row.vehicle_image,
                        model: row.model,
                        licenseplate: row.licenseplate
                    },
                    state: row.state,
                    entry: row.entrydate.toLocaleDateString(),
                    departure: row.departuredate ? row.departuredate.toLocaleDateString() : "Ahora",
                    client: row.client,
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