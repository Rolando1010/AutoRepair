import useClientAndTechnicians from "src/views/hooks/useClientsAndTechnicians";
import { AdviserLayout } from "src/views/layouts";
import Vehicle from "./vehicle";
import Tasks from "./tasks";
import { WorkOrderContext } from "./context";
import Client from "./client";
import Upload from "./upload";

const WorkOrderCreation = () => {
    const { clients, technicians, updateClientsAndTechnicians } = useClientAndTechnicians();

    return (<>
        <WorkOrderContext>
            <AdviserLayout>
                <h2>Nueva Orden de Trabajo</h2>
                <Client clients={clients} onUserCreation={updateClientsAndTechnicians}/>
                <Vehicle/>
                <Tasks technicians={technicians}/>
                <Upload/>
            </AdviserLayout>
        </WorkOrderContext>
        <style jsx>{`
            h2 {
                margin: 20px 0;
                text-align: center;
                font-size: 30px;
            }
        `}</style>
    </>);
}

export default WorkOrderCreation;