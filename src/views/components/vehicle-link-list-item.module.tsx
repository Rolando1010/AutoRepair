import Link from "next/link";
import { StateValues, type State, type Vehicle } from "src/models/types";
import styles from "src/views/styles/vehicle-link-list-item.module.css";
import Point from "./point";

const VehicleLinkListItem = ({ url, vehicle, title, time, state }: {
    url: string,
    vehicle: Vehicle,
    title: React.ReactNode,
    time: React.ReactNode,
    state: State
}) => {
    return (
        <Link href={url} className={styles.listelement}>
            <li>
                <header>
                    <aside>
                        <img src={vehicle.image} alt={vehicle.model}/>
                    </aside>
                    <div>
                        <h3>{vehicle.model}</h3>
                        <p>{vehicle.licenseplate}</p>
                        <p>{vehicle.owner?.name}</p>
                    </div>
                </header>
                <div>
                    <h4>{title}</h4>
                    <p>{time}</p>
                    <p><Point/> {StateValues[state]}</p>
                </div>
            </li>
        </Link>
    );
}

export default VehicleLinkListItem;