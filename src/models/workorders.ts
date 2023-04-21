import { databaseQuery } from "./database";
import { type WorkOrder } from "./types";

const getWorkOrders = () => {
    return new Promise<WorkOrder[]>(resolve => {
        databaseQuery("SELECT * FROM getWorkOrders")
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

export {
    getWorkOrders
}