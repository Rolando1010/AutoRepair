import { useEffect, useState } from "react";
import { type Task } from "src/models/types";
import requests from "../utils/requests";

const useTasks = (month: number, year: number) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        requests
            .get<{tasks: Task[]}>(`/api/tasks?month=${month}&year=${year}`)
            .then(response => {
                setTasks(response.tasks.map(task => {
                    return {...task, day: new Date(task.day)};
                }));
            });
    }, [month, year]);

    return tasks;
}

export default useTasks;