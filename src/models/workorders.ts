import { databaseQuery } from "./database";

type WorkOrder = {
    id: number,
    vehicle: {
        image: string,
        model: string,
        licenseplate: string,
    },
    state: string,
    entry: string,
    departure: string,
    client: string,
    advisor: string
}

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
                    entry: String(row.entrydate),
                    departure: String(row.departuredate),
                    client: row.client,
                    advisor: row.creator
                }
            }));
        });
    });
}

export {
    getWorkOrders
}