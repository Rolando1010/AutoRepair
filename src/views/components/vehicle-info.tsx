import { Vehicle } from "src/models/types";

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

export default VehicleInfo;