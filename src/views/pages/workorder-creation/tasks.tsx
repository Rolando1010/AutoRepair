import { useRef } from "react";
import { User } from "src/models/types";
import Modal, { getInititalModalRef } from "src/views/components/modal";
import Container from "./container";
import Button from "src/views/components/button";
import Form from "src/views/components/form";
import { LabelInput, LabelSelect, LabelTextArea } from "src/views/components/input";
import { Task } from "./types";
import { useWorkOrderCreation } from "./context";

const Tasks = ({ technicians }: {technicians: User[]}) => {
    const { tasks, addTask } = useWorkOrderCreation();
    const modalRef = useRef(getInititalModalRef());

    const taskCreation = (data: any, reset: () => void) => {
        addTask({...data,
            day: new Date(data.day),
            technician: technicians.find(t => t.id === Number(data.technician))
        });
        reset();
        modalRef.current.close();
    }

    return (<>
        <Container title="Tareas" headerComplement={
            <Button onClick={() => modalRef.current.open()}>Crear Tarea</Button>
        }>
            <TasksList tasks={tasks}/>
        </Container>
        <Modal title="Nueva tarea" modalRef={modalRef}>
            <Form title="Creación de tarea" setDataOnSubmit={taskCreation}>
                <LabelInput name="name" label="Nombre" type="text"/>
                <LabelTextArea name="description" label="Descripción"/>
                <LabelInput name="day" label="Día" type="date"/>
                <LabelSelect
                    label="Técnico"
                    name="technician"
                    options={technicians.map(t => ({value: String(t.id), text: t.name}))}
                />
            </Form>
        </Modal>
    </>);
}

const TasksList = ({ tasks }: { tasks: Task[] }) => <>
    <ul>
        {!tasks.length && <p className="no-results">No se han ingresado tareas</p> }
        {tasks.map((t, index) =>
            <li key={`task-${index}`}>
                <div>
                    <aside>
                        <h3>{t.name}</h3>
                        <p>{t.technician.name}</p>
                    </aside>
                    <p>{t.day.toLocaleDateString()}</p>
                </div>
                <p>{t.description}</p>
            </li>
        )}
    </ul>
    <style jsx>{`
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            background-color: var(--background-3);
            padding: 5px 10px;
            border-bottom: 2px solid var(--background-1);
        }

        li:first-child {
            border-radius: 10px 10px 0 0;
        }

        li:last-child {
            border-radius: 0 0 10px 10px;
            border-bottom: 1px solid transparent;
        }

        li:only-child {
            border-radius: 10px;
        }

        div {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        h3, p {
            margin: 0;
        }

        .no-results {
            text-align: center;
            font-size: 20px;
            margin-bottom: 15px;
        }
    `}</style>
</>;

export default Tasks;