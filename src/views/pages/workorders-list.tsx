import Link from "next/link";
import { State, type WorkOrder } from "src/models/types";
import styles from "src/views/styles/workorders.module.css";
import Point from "../components/point";
import { AdviserLayout } from "../layouts";

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
                    <Link
                        key={`workorder-${index}`}
                        href={`/asesor/ordenes-trabajo/${wo.id}`}
                    >
                        <li>
                            <header>
                                <aside>
                                    <img src={wo.vehicle.image} alt={wo.vehicle.model}/>
                                </aside>
                                <div>
                                    <h3>{wo.vehicle.model}</h3>
                                    <p>{wo.vehicle.licenseplate}</p>
                                    <p>{wo.client}</p>
                                </div>
                            </header>
                            <div>
                                <h4><span>Creado por:</span> {wo.adviser}</h4>
                                <p>{wo.entry} - {wo.departure}</p>
                                <p><Point/> {State[wo.state]}</p>
                            </div>
                        </li>
                    </Link>
                )}
            </ul>
        </AdviserLayout>
    </>);
}

export default WorkOrdersList;