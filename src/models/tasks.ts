import { connectDatabase, queryDatabase } from "./database";
import { getStateID } from "./state";
import { type State, type Task, States } from "./types";
import { updateWorkOrderState } from "./workorder";

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

const getTask = (taskID: number) => {
    return new Promise<Task>(resolve => {
        queryDatabase(`
            SELECT
                t.id, t.name, t.description, t.day, s.name as state,
                v.model, v.licenseplate, v.image, v.year
            FROM
                Tasks t JOIN
                WorkOrders wo ON t.workorderID = wo.id JOIN
                Vehicles v ON wo.vehicleID = v.id JOIN
                States s ON t.stateID = s.id
            WHERE t.id = ${taskID}
        `).then(({ rows }) => {
            const [firstRow] = rows;
            resolve({
                id: firstRow.id,
                name: firstRow.name,
                description: firstRow.description,
                day: firstRow.day,
                state: firstRow.state,
                vehicle: {
                    model: firstRow.model,
                    licenseplate: firstRow.licenseplate,
                    image: firstRow.image,
                    year: firstRow.year
                }
            });
        });
    });
}

/*
* Creamos el reporte
* Actualizamos el estado de la tarea
* Si el nuevo estado (state) es en progreso y el de la orden de trabajo (woState) es pendiente pone el woState en progreso. Si el woState está en progreso o finalizado lo deja igual.
* Si state es finalizado y todas las demás tareas de la orden de trabajo están finalizadas ponemos el woState en finalizado
*/
const createReport = (taskID: number, state: State, description: string) => {
    return new Promise<void>(resolve => {
        connectDatabase(async connection => {
            const stateID = await getStateID(state);
            await connection.query(`
                INSERT INTO TaskReports (taskID, description)
                VALUES (${taskID}, '${description}');

                UPDATE Tasks
                SET stateID = ${stateID}
                WHERE id = ${taskID}
            `);
            const { rows : [{ id: workorderID, state: workorderState }]} = await connection
                .query<{id: number, state: State}>(`
                    SELECT wo.id, s.name as state
                    FROM
                        Tasks t JOIN
                        WorkOrders wo ON t.workorderID = wo.id JOIN
                        States s ON s.id = wo.stateID
                    WHERE t.id = ${taskID}
                `);
            if(state === States.IN_PROGRESS && workorderState === States.PENDING) {
                await updateWorkOrderState(workorderID, stateID);
                return resolve();
            }
            if(state === States.FINISHED){
                const workorderTasksStates = (await connection.query<{taskstate: State}>(`
                    SELECT s.name as taskstate
                    FROM
                        WorkOrders wo JOIN
                        States s ON wo.stateID = s.id
                    WHERE wo.id = ${workorderID}
                `)).rows.map(({ taskstate }) => taskstate);
                if(
                    workorderTasksStates
                    .filter(s => s === States.FINISHED)
                    .length === workorderTasksStates.length - 1
                ) {
                    await updateWorkOrderState(workorderID, stateID)
                    return resolve();
                }
            }
            connection.end();
            return resolve();
        });
    });
}

export {
    getTechnicianTasks,
    getTask,
    createReport
}