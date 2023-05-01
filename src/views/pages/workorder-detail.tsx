import { useRef } from "react";
import { StateValues, type Task, type WorkOrder } from "src/models/types";
import VehicleInfo from "../components/vehicle-info";
import Point from "../components/point";
import Button from "../components/button";
import Modal, { getInititalModalRef } from "../components/modal";

const WorkOrderDetail = ({ workorder }: { workorder: WorkOrder }) => {
    return (<>
        <h2>Orden de Trabajo para {workorder.client.name}</h2>
        <h3><Point/> Vehículo</h3>
        <VehicleInfo vehicle={workorder.vehicle}/>
        <h3><Point/> Tareas</h3>
        <table>
            <thead>
                <tr>
                    <th>Tarea</th>
                    <th>Estado</th>
                    <th>Reportes</th>
                </tr>
            </thead>
            <tbody>
                {workorder.tasks?.map((task, index) =>
                    <tr key={`row-${index}`}>
                        <td>{task.name}</td>
                        <td>{StateValues[task.state]}</td>
                        <td><TaskReports task={task}/></td>
                    </tr>
                )}
            </tbody>
        </table>
        <style jsx>{`
            h2 {
                text-align: center;
                margin: 0 0 25px 0;
                font-size: 30px;
            }

            h3 {
                margin: 0;
                font-size: 25px;
                margin-bottom: 10px;
            }

            table {
                width: 100%;
            }
            
            th {
                text-align: center;
                font-size: 22px;
            }

            td {
                font-size: 18px;
            }
            
            th, td {
                padding: 5px 0; 
                background-color: var(--background-2);
                border: 2px solid var(--font-color-2);
            }

            td:not(:last-child) {
                text-align: center;
            }
        `}</style>
    </>);
}

const TaskReports = ({ task }: { task: Task }) => {
    const modalRef = useRef(getInititalModalRef());

    return (<>
        <center>
            <Button onClick={() => modalRef.current.open()}>Abrir</Button>
        </center>
        <Modal title={`Reportes de tarea ${task.name}`} modalRef={modalRef}>
            <h4><Point/> {task.name}</h4>
            <p>{task.description}</p>
            <ul>
                {task.reports?.map((report, index) =>
                    <li key={`task-report-${index}`}>
                        <span>{new Date(report.creation).toLocaleDateString()}</span>
                        <p>{report.description}</p>
                    </li>
                )}
            </ul>
        </Modal>
        <style jsx>{`
            h4, p {
                margin: 10px 0;
            }

            h4 {
                font-size: 22px;
            }

            ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            li {
                background-color: var(--background-2);
                padding: 10px 15px;
                border-radius: 10px;
                margin-bottom: 15px;
            }

            span {
                font-size: 16px;
            }

            li p {
                margin: 5px 0 0 0;
            }
        `}</style>
    </>);
}

export default WorkOrderDetail;