import { databaseQuery } from "./database";

type WorkOrder = {
    id: number,
    vehicle: {
        image: string,
        model: string,
        licenseplate: string,
    },
    state: string,
    entry: Date,
    departure: Date,
    client: string,
    advisor: string
}

const getWorkOrders = () => {
    return new Promise<WorkOrder[]>(resolve => {
        databaseQuery("SELECT * FROM getWorkOrders")
        .then(({ rows }) => {
            resolve(rows.map(row => ({
                id: row.id,
                vehicle: {
                    image: row.vehicle_image,
                    model: row.model,
                    licenseplate: row.licenseplate
                },
                state: row.state,
                entry: new Date(row.entryDate),
                departure: new Date(row.departureDate),
                client: row.client,
                advisor: row.creator
            })))
        });
    });
}

export {
    getWorkOrders
}