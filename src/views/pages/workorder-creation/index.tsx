import { useRef } from "react";
import Button from "src/views/components/button";
import { LabelSelect } from "src/views/components/input";
import Modal, { getInititalModalRef } from "src/views/components/modal";
import UserCreation from "src/views/components/user-creation";
import useClientAndTechnicians from "src/views/hooks/useClientsAndTechnicians";
import { AdviserLayout } from "src/views/layouts";
import Container from "./container";
import Vehicle from "./vehicle";
import Tasks from "./tasks";
import { WorkOrderContext, useWorkOrderCreation } from "./context";

const WorkOrderCreation = () => {
    const { clients, technicians, updateClientsAndTechnicians } = useClientAndTechnicians();
    const modalRef = useRef(getInititalModalRef());
    const { setClient } = useWorkOrderCreation();

    const userCreation = () => {
        modalRef.current.close();
        updateClientsAndTechnicians();
    }

    return (<>
        <WorkOrderContext>
            <AdviserLayout>
                <h2>Nueva Orden de Trabajo</h2>
                <Container title="Cliente" headerComplement={
                    <Button onClick={() => modalRef.current.open()}>Crear usuario</Button>
                }>
                    <LabelSelect
                        label="Clientes"
                        options={clients.map(c => ({value: String(c.id), text: c.name}))}
                        onChange={event => setClient(Number(event.target.value))}
                    />
                </Container>
                <Vehicle/>
                <Tasks technicians={technicians}/>
                <button>Guardar Orden de Trabajo</button>
            </AdviserLayout>
        </WorkOrderContext>
        <Modal title="Creación de usuario" modalRef={modalRef}>
            <UserCreation onUserCreation={userCreation}/>
        </Modal>
        <style jsx>{`
            h2 {
                margin: 20px 0;
                text-align: center;
                font-size: 30px;
            }

            button {
                width: 100%;
                padding: 15px 20px;
                margin-bottom: 20px;
                font-size: 22px;
                background-color: var(--primary-2);
                border: 0;
                border-radius: 10px;
                cursor: pointer;
            }

            button:hover, button:focus {
                background-color: var(--primary-1);
            }
        `}</style>
    </>);
}

export default WorkOrderCreation;