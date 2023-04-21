import { Role } from "src/models/types";
import { AdviserLayout } from "../layouts";
import Form from "../components/form";
import { LabelInput, LabelSelect } from "../components/input";
import { useRef } from "react";

const rolesForSelectInput = Object.entries(Role).map(([value, text]) => ({value, text}));


const UsersManagement = () => {
    const roleRef = useRef<HTMLSelectElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const sendUserData: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        
    }

    return (
        <AdviserLayout>
            <Form title="Creación de Usuario" onSubmit={sendUserData}>
                <LabelSelect label="Rol" name="role" options={rolesForSelectInput} ref={roleRef}/>
                <LabelInput label="Nombre" name="name" type="text" ref={nameRef}/>
                <LabelInput label="Contraseña" name="password" type="password" ref={passwordRef}/>
            </Form>
        </AdviserLayout>
    );
}

export default UsersManagement;