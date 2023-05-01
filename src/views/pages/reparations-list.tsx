import { type User, type WorkOrder } from "src/models/types";
import { ClientLayout } from "../layouts";
import VehicleLinkListItem from "../components/vehicle-link-list-item.module";

const WorkOrdersList = ({ client, workorders }: { client: User, workorders: WorkOrder[]}) => {
    return (<>
        <ClientLayout>
            <h2>Lista de reparaciones</h2>
            <h3>{client.name}</h3>
            <span>{workorders.length} {workorders.length === 1 ? "reparación" : "reparaciones"}</span>
            <ul>
                {workorders.map((wo, index) =>
                    <VehicleLinkListItem
                        key={`work-order-${index}`}
                        url={`/cliente/reparaciones/${wo.id}`}
                        vehicle={wo.vehicle}
                        title={<><span>Creado por:</span> {wo.adviser}</>}
                        time={<>{wo.entry} - {wo.departure}</>}
                        state={wo.state}
                    />
                )}
            </ul>
        </ClientLayout>
        <style jsx>{`
            h2 {
                margin: 30px 0 5px 0;
                text-align: center;
                font-size: 30px;
            }

            ul {
                list-style: none;
                padding: 0;
            }
        `}</style>
    </>);
}

export default WorkOrdersList;