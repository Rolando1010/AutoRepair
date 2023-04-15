import { HTMLInputTypeAttribute } from "react";
import Button from "src/views/components/button";
import Navbar from "src/views/layouts/navbar";
import WidthLimit from "src/views/layouts/width-limit";

const Login = () => {
    return (<>
        <Navbar/>
        <WidthLimit>
            <form method="POST" action="/api/login">
                <h2>Inicio de Sesión</h2>
                <LabelInput label="Nombre:" type="text" name="name"/>
                <LabelInput label="Contraseña:" type="password" name="password"/>
                <Button>Enviar</Button>
            </form>
        </WidthLimit>
        <style jsx>{`
            h2 {
                margin: 0;
                color: var(--primary-1);
                font-size: 30px;
                margin-bottom: 15px;
            }

            form {
                background-color: var(--background-2);
                border-radius: 10px;
                padding: 20px 30px;
                text-align: center;
                width: 80%;
                margin: 50px auto 0;
            }
        `}</style>
    </>);
}

const LabelInput = ({ label, type, name }: {label: string, type: HTMLInputTypeAttribute, name: string}) => {
    return (<>
        <label>
            <span>{label}</span>
            <input type={type} name={name}/>
        </label>
        <style jsx>{`
            label {
                display: flex;
                justify-content: space-between;
                gap: 10px;
                margin-bottom: 20px;
                font-size: 18px;
            }

            span {
                font-weight: bold;
            }

            input {
                flex-grow: 1;
                border: 0;
                background-color: transparent;
                border-bottom: 2px solid var(--font-color-1);
                outline: none;
                font-size: 18px;
                color: var(--font-color-2);
            }
        `}</style>
    </>);
}

export default Login;