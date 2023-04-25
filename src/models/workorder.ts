import { connectDatabase, queryDatabase } from "./database";
import { Task, Vehicle, type WorkOrder } from "./types";

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
                    departure: row.departuredate.toLocaleDateString(),
                    client: row.client,
                    adviser: row.creator
                }
            }));
        });
    });
}

// Crear orden de trabajo
// Guardar tareas

const saveWorkorder = (advicerID: number, clientID: number, vehicle: Vehicle, tasks: Task[]) => {
    return new Promise(resolve => {
        connectDatabase(async connection => {
            const { rows } = await connection.query(`SELECT createVehicle(
                '${vehicle.model}',
                '${vehicle.licenseplate}',
                '${vehicle.image}',
                ${vehicle.year},
                ${clientID}
            )`);
            const [{ createvehicle: vehicleID }] = rows;
            connection.end();
        });
    });
}

export {
    saveWorkorder,
    getWorkOrders
}