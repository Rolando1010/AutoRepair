import { LabelInput } from "src/views/components/input";
import Container from "./container";
import { useWorkOrderCreation } from "./context";

const Vehicle = () => {
    const { setVehicle } = useWorkOrderCreation();

    return (<>
        <Container title="Vehículo">
            <LabelInput
                label="Modelo"
                type="text"
                onChange={event => setVehicle("model", event.target.value)}
            /> 
            <LabelInput
                label="Placa"
                type="text"
                onChange={event => setVehicle("licenseplate", event.target.value)}
            />
            <LabelInput
                label="Foto"
                type="url"
                required
                placeholder="https://vehiculos.com/foto-de-vehiculo.png"
                onChange={event => setVehicle("image", event.target.value)}
            />
            <LabelInput
                label="Año"
                type="number"
                min="1900"
                max="2099"
                step="1"
                onChange={event => setVehicle("year", event.target.value)}
            />
        </Container>
    </>);
}

export default Vehicle;