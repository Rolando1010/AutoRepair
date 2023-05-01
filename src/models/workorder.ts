import { connectDatabase, queryDatabase } from "./database";
import { getStateID } from "./state";
import { States, Task, Vehicle, type WorkOrder } from "./types";

const getWorkOrders = (where: string = "") => {
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
            ${where}
        `).then(({ rows }) => {
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

            const stateID = await getStateID(States.PENDING);

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

const updateWorkOrderState = (workorderID: number, stateID: number) => {
    return queryDatabase(`
        UPDATE WorkOrders
        SET stateID = ${stateID}
        WHERE id = ${workorderID}
    `);
}

const getWorkOrder = (workorderID: number) => {
    return new Promise<WorkOrder>(resolve => {
        connectDatabase(async connection => {
            const { rows: [ workorderRow ] }= await connection.query(`
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
                WHERE wo.id = ${workorderID}
            `);
            const client = {
                id: workorderRow.clientid,
                name: workorderRow.clientname
            };
            const vehicle = {
                image: workorderRow.vehicle_image,
                model: workorderRow.model,
                licenseplate: workorderRow.licenseplate,
                owner: client
            };
            const {rows: tasksRows } = await connection.query(`
                SELECT
                    t.id, t.name, t.description, t.day, s.name as state
                FROM
                    Tasks t JOIN
                    WorkOrders wo ON t.workorderID = wo.id JOIN
                    States s ON t.stateID = s.id
                WHERE wo.id = ${workorderID}
            `);
            let tasksReports: any = {};
            if(tasksRows.length){
                const {rows: tasksReportsRows } = await connection.query(`
                    SELECT id, creation, description, taskID
                    FROM TaskReports
                    WHERE taskID IN (${tasksRows.map(task => task.id).join(",")});
                `);
                tasksReports = tasksReportsRows.reduce((acc, el) => {
                    const newTaskReport = {
                        id: el.id,
                        creation: el.creation.toISOString(),
                        description: el.description
                    };
                    if(acc[el.taskid]){
                        acc[el.taskid].push(newTaskReport);
                    } else {
                        acc[el.taskid] = [newTaskReport];
                    }
                    return acc;
                }, {});
            }
            connection.end();
            const tasks: Task[] = tasksRows.map(task  => ({
                id: task.id,
                name: task.name,
                description: task.description,
                day: task.day.toISOString(),
                state: task.state,
                vehicle,
                reports: tasksReports[task.id] ?? null
            }));
            return resolve({
                id: workorderRow.id,
                vehicle,
                state: workorderRow.state,
                entry: workorderRow.entrydate.toISOString(),
                departure: workorderRow.departuredate ? workorderRow.departuredate.toISOString() : "Ahora",
                client,
                adviser: workorderRow.creator,
                tasks
            });
        });
    });
}

export {
    saveWorkorder,
    getWorkOrders,
    updateWorkOrderState,
    getWorkOrder
}