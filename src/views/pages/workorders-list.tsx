import Link from "next/link";
import { type WorkOrder } from "src/models/types";
import styles from "src/views/styles/workorders.module.css";
import { AdviserLayout } from "../layouts";
import VehicleLinkListItem from "../components/vehicle-link-list-item.module";

const WorkOrdersList = ({ workorders }: { workorders: WorkOrder[]}) => {
    return (<>
        <AdviserLayout>
            <h2 className={styles.title}>Lista de reparaciones</h2>
            <div className={styles.add}>
                <Link href="/asesor/ordenes-trabajo/crear">
                    <img src="/add.svg" alt="add"/>
                    <span>Agregar</span>
                </Link>
            </div>
            <ul className={styles.workorders}>
                {workorders.map((wo, index) =>
                    <VehicleLinkListItem
                        key={`work-order-${index}`}
                        url={`/asesor/ordenes-trabajo/${wo.id}`}
                        vehicle={wo.vehicle}
                        title={<><span>Creado por:</span> {wo.adviser}</>}
                        time={<>{wo.entry} - {wo.departure}</>}
                        state={wo.state}
                    />
                )}
            </ul>
        </AdviserLayout>
    </>);
}

export default WorkOrdersList;