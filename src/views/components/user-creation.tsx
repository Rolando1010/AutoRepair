import requests from "../utils/requests";
import toast from "./toast";
import { RoleValues } from "src/models/types";
import Form from "./form";
import { LabelInput, LabelSelect } from "./input";

const rolesForSelectInput = Object.entries(RoleValues).map(([value, text]) => ({value, text}));

const UserCreation = ({ onUserCreation }: {onUserCreation?: () => void}) => {
    const sendUserData = (data: any, reset: () => void) => {
        requests.post("/api/users", data).then(() => {
            toast.success("Usuario guardado");
            reset();
            if(onUserCreation) onUserCreation();
        });
    }

    return (
        <Form title="Creación de Usuario" setDataOnSubmit={sendUserData}>
            <LabelSelect name="role" label="Rol" options={rolesForSelectInput}/>
            <LabelInput name="name" label="Nombre" type="text"/>
            <LabelInput name="password" label="Contraseña" type="password"/>
        </Form>
    );
}

export default UserCreation;