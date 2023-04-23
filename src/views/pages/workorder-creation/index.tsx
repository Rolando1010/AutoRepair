import { useRef, useState } from "react";
import { type User } from "src/models/types";
import Button from "src/views/components/button";
import Form from "src/views/components/form";
import { LabelInput, LabelSelect, LabelTextArea } from "src/views/components/input";
import Modal, { getInititalModalRef } from "src/views/components/modal";
import UserCreation from "src/views/components/user-creation";
import useClientAndTechnicians from "src/views/hooks/useClientsAndTechnicians";
import { AdviserLayout } from "src/views/layouts";

const WorkOrderCreation = () => {
    const { clients, technicians, updateClientsAndTechnicians } = useClientAndTechnicians();
    const modalRef = useRef(getInititalModalRef());
    
    const userCreation = () => {
        modalRef.current.close();
        updateClientsAndTechnicians();
    }

    return (<>
        <AdviserLayout>
            <h2>Nueva Orden de Trabajo</h2>
            <Container title="Cliente" headerComplement={
                <Button onClick={() => modalRef.current.open()}>Crear usuario</Button>
            }>
                <LabelSelect
                    label="Clientes"
                    options={clients.map(c => ({value: String(c.id), text: c.name}))}
                />
            </Container>
            <Vehicle/>
            <Tasks technicians={technicians}/>
            <button>Guardar Orden de Trabajo</button>
        </AdviserLayout>
        <Modal title="Creación de usuario" modalRef={modalRef}>
            <UserCreation onUserCreation={userCreation}/>
        </Modal>
        <style jsx>{`
            h2 {
                margin: 20px 0;
                text-align: center;
                font-size: 30px;
            }

            button {
                width: 100%;
                padding: 15px 20px;
                margin-bottom: 20px;
                font-size: 22px;
                background-color: var(--primary-2);
                border: 0;
                border-radius: 10px;
                cursor: pointer;
            }

            button:hover, button:focus {
                background-color: var(--primary-1);
            }
        `}</style>
    </>);
}

const Container = ({ title, children, headerComplement }: {
    title: string,
    headerComplement?: React.ReactNode,
    children: React.ReactNode
}) => {
    return (<>
        <article>
            <header>
                <h3>{title}</h3>
                {headerComplement}
            </header>
            <div>
                {children}
            </div>
        </article>
        <style jsx>{`
            article {
                border-radius: 10px;
                background-color: var(--background-2);
                margin: 20px 0;
            }

            header, div {
                padding: 10px 15px;
            }

            header {
                border-bottom: 2px solid var(--background-1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            div {
                padding-top: 20px;
            }

            h3 {
                margin: 0;
                font-size: 22px;
                color: var(--primary-1);
            }
        `}</style>
    </>);
}

const Vehicle = () => {
    return (<>
        <Container title="Vehículo">
            <LabelInput label="Modelo" type="text"/> 
            <LabelInput label="Placa" type="text"/>
            <LabelInput label="Foto" type="url"/>
            <LabelInput label="Año" type="number" min="1900" max="2099" step="1"/>
        </Container>
    </>);
}

type Task = {
    name: string,
    description: string,
    day: Date,
    technician: User
};

const Tasks = ({ technicians }: {technicians: User[]}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const modalRef = useRef(getInititalModalRef());

    const taskCreation = (data: any, reset: () => void) => {
        setTasks([...tasks, {...data,
            day: new Date(data.day),
            technician: technicians.find(t => t.id === Number(data.technician))
        }]);
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

export default WorkOrderCreation;