import { type Task } from "src/models/types";
import useCalendar from "../hooks/useCalendar";
import useTasks from "../hooks/useTasks";
import { TechnicianLayout } from "../layouts";
import { days } from "../utils/date";
import { useMemo } from "react";
import Button from "../components/button";

const TasksCalendar = () => {
    const { month, year, weeksMonth, detailMonth, decrementhMonth, incrementhMonth } = useCalendar();
    const tasks = useTasks(month, year);

    return (<>
        <TechnicianLayout>
            <nav>
                <div>
                    <button onClick={decrementhMonth}>{"<"}</button>
                </div>
                <h2>{detailMonth}</h2>
                <div>
                    <button onClick={incrementhMonth}>{">"}</button>
                </div>
            </nav>
            <table>
                <thead>
                    <tr>
                        {days.map((day, index) =>
                            <th key={`day-${index}`}>{day.slice(0, 3)}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {weeksMonth.map((week, windex) =>
                        <tr key={`week-${windex}`}>
                            {week.map((day, dindex) =>
                                <td key={`week-${windex}-day-${dindex}`}>
                                    <Day day={day} tasks={tasks}/>
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </TechnicianLayout>
        <style jsx>{`
            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            button {
                font-size: 35px;
                background-color: var(--background-2);
                padding: 2px 12px;
                border: 0;
                border-radius: 10px;
                cursor: pointer;
            }

            button:hover, button:focus {
                background-color: var(--background-3);
            }

            table {
                width: 100%;
                text-align: center;
            }

            th {
                font-size: 22px;
            }

            td {
                font-size: 18px;
            }

            th, td {
                padding: 5px 0;
                background-color: var(--background-2);
            }
        `}</style>
    </>);
}

const Day = ({ day, tasks }: {day: Date, tasks: Task[]}) => {
    const dayTasks = useMemo(() => {
        return tasks.filter(task => task.day.toLocaleDateString() === day.toLocaleDateString());
    }, []);

    if(!day) return null;
    return (<>
        <span>{day.getDate()}</span>
        {dayTasks.length ? <Button>Ver</Button> : null}
    </>);
}

export default TasksCalendar;