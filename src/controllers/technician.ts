import { getTask } from "src/models/tasks";
import { isViewAuthenticated } from "./auth";

const tasksController = isViewAuthenticated(() => {props: {}});

const taskController = isViewAuthenticated(async context => {
    const { params }: any = context;
    const task = await getTask(Number(params.taskID));
    return {props: {task: {...task, day: task.day.toISOString()}}};
});

export {
    tasksController,
    taskController
}