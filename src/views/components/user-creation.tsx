import { useRef } from "react";
import requests from "../utils/requests";
import toast from "./toast";
import { Role } from "src/models/types";
import Form from "./form";
import { LabelInput, LabelSelect } from "./input";

const rolesForSelectInput = Object.entries(Role).map(([value, text]) => ({value, text}));

const UserCreation = ({ onUserCreation }: {onUserCreation?: () => void}) => {
    const roleRef = useRef<HTMLSelectElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const sendUserData: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        requests.post("/api/users", {
            name: nameRef.current?.value,
            password: passwordRef.current?.value,
            role: roleRef.current?.value
        }).then(() => {
            toast.success("Usuario guardado");
            if(nameRef.current) nameRef.current.value = "";
            if(passwordRef.current) passwordRef.current.value = "";
            if(roleRef.current) roleRef.current.value = "";
            if(onUserCreation) onUserCreation();
        });
    }

    return (
            <Form title="Creación de Usuario" onSubmit={sendUserData}>
                <LabelSelect label="Rol" name="role" options={rolesForSelectInput} forwardRef={roleRef}/>
                <LabelInput label="Nombre" name="name" type="text" forwardRef={nameRef}/>
                <LabelInput label="Contraseña" name="password" type="password" forwardRef={passwordRef}/>
            </Form>
    );
}

export default UserCreation;