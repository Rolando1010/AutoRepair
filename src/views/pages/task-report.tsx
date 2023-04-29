import { type Vehicle, type Task, StateValues } from "src/models/types";
import Form from "../components/form";
import { LabelSelect, LabelTextArea } from "../components/input";
import { TechnicianLayout } from "../layouts";

const statesForSelectInput = Object.entries(StateValues).map(([value, text]) => ({value, text}));

const TaskReport = ({ task }: {task: Task}) => {
    return (<>
        <TechnicianLayout>
            <h2>{task.name}</h2>
            <VehicleInfo vehicle={task.vehicle}/>
            <Form title="Reporte" action={`/tasks/${task.id}/reports`}>
                <LabelSelect name="state" label="Estado" options={statesForSelectInput}/>
                <LabelTextArea name="description" label="Descripción"/>
            </Form>
        </TechnicianLayout>
        <style jsx>{`
            h2 {
                text-align: center;
                margin: 0 0 25px 0;
            }
        `}</style>
    </>);
}

const VehicleInfo = ({ vehicle }: {vehicle: Vehicle}) => {
    return (<>
        <div>
            <img src={vehicle.image} alt={vehicle.model}/>
            <aside>
                <h3>{vehicle.model}</h3>
                <p>{vehicle.licenseplate}</p>
                <p>{vehicle.year}</p>
            </aside>
        </div>
        <style jsx>{`
            div {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 25px;
            }

            img {
                width: 200px;
                border-radius: 10px;
            }

            h3, p {
                margin: 10px 0;
            }
        `}</style>
    </>);
}

export default TaskReport;