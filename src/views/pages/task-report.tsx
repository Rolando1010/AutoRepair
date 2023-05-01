import { type Vehicle, type Task, StateValues } from "src/models/types";
import Form from "../components/form";
import { LabelSelect, LabelTextArea } from "../components/input";
import { TechnicianLayout } from "../layouts";
import VehicleInfo from "../components/vehicle-info";

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

export default TaskReport;