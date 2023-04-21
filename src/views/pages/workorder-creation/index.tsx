import { useRef } from "react";
import Button from "src/views/components/button";
import { LabelSelect } from "src/views/components/input";
import Modal, { getInititalModalRef } from "src/views/components/modal";
import UserCreation from "src/views/components/user-creation";
import useClient from "src/views/hooks/useClient";
import { AdviserLayout } from "src/views/layouts";

const WorkOrderCreation = () => {
    return (
        <AdviserLayout>
            <VehicleSelection/>
        </AdviserLayout>
    );
}

const VehicleSelection = () => {
    const { clients, updateClients } = useClient();
    const modalRef = useRef(getInititalModalRef());

    const userCreation = () => {
        modalRef.current.close();
        updateClients();
    }

    return (<>
        <Button onClick={() => modalRef.current.open()}>Selecciona a un usuario</Button>
        <LabelSelect
            label="Clientes"
            options={clients.map(c => ({value: String(c.id), text: c.name}))}
        />
        <Modal title="Creación de usuario" modalRef={modalRef}>
            <UserCreation onUserCreation={userCreation}/>
        </Modal>
    </>);
}

export default WorkOrderCreation;