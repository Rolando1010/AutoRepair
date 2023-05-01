import { type NextApiRequest, type NextApiResponse } from "next"
import { type User } from "src/models/types";
import { createReport, getTechnicianTasks } from "src/models/tasks";
import { isAPIAuthenticated, isViewAuthenticated } from "./auth";
import { getBody } from "./utils";

const tasksController = isAPIAuthenticated(async(
    request: NextApiRequest,
    response: NextApiResponse,
    user: User
) => {
    if(request.method !== "GET") return response.status(404).json({ success: false });
    const { month , year } = request.query;
    const tasks = (await getTechnicianTasks(user.id, Number(month), Number(year))).map(task => {
        return {...task, day: task.day.toISOString()}
    });
    return response.status(200).json({ success: true, tasks });
});

const reportsController = isViewAuthenticated(async (context) => {
    const { params: { id } }: any = context;
    const { state, description } = await getBody(context.req);
    await createReport(id, state, description);
    return {redirect: {destination: "/tecnico/tareas"}};
});

export {
    tasksController,
    reportsController
}