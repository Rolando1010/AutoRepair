import Link from "next/link";
import { State, type WorkOrder } from "src/models/types";
import styles from "src/views/styles/workorders.module.css";
import Navbar from "../layouts/navbar";
import WidthLimit from "../layouts/width-limit";
import Point from "../components/point";

const WorkOrdersList = ({ workorders }: { workorders: WorkOrder[]}) => {
    return (<>
        <Navbar/>
        <WidthLimit>
            <h2 className={styles.title}>Lista de reparaciones</h2>
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
                                </div>
                            </header>
                            <div>
                                <h4>{wo.client}</h4>
                                <p>{wo.entry} - {wo.departure}</p>
                                <p><Point/> {State[wo.state]}</p>
                            </div>
                        </li>
                    </Link>
                )}
            </ul>
        </WidthLimit>
    </>);
}

export default WorkOrdersList;