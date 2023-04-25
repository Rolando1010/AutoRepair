import { useRef } from "react";
import Button from "src/views/components/button";
import Container from "./container";
import Modal, { getInititalModalRef } from "src/views/components/modal";
import { useWorkOrderCreation } from "./context";
import UserCreation from "src/views/components/user-creation";
import { LabelSelect } from "src/views/components/input";
import { type User } from "src/models/types";

const Client = ({ clients, onUserCreation }: {clients: User[], onUserCreation: () => void}) => {
    const modalRef = useRef(getInititalModalRef());
    const { setClient } = useWorkOrderCreation();

    const userCreation = () => {
        modalRef.current.close();
        onUserCreation();
    }

    return (<>
        <Container title="Cliente" headerComplement={
            <Button onClick={() => modalRef.current.open()}>Crear usuario</Button>
        }>
            <LabelSelect
                label="Clientes"
                options={clients.map(c => ({value: String(c.id), text: c.name}))}
                onChange={event => setClient(Number(event.target.value))}
                />
        </Container>
        <Modal title="Creación de usuario" modalRef={modalRef}>
            <UserCreation onUserCreation={userCreation}/>
        </Modal>
    </>);
}

export default Client;