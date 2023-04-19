import { HTMLInputTypeAttribute } from "react";
import Button from "src/views/components/button";
import Navbar from "src/views/layouts/navbar";
import WidthLimit from "src/views/layouts/width-limit";

const Login = ({ error }: {error?: string}) => {
    return (<>
        <Navbar/>
        <WidthLimit>
            {error && <p>{error}</p>}
            <form method="POST" action="/auth/login">
                <h2>Inicio de Sesión</h2>
                <LabelInput label="Nombre:" type="text" name="name"/>
                <LabelInput label="Contraseña:" type="password" name="password"/>
                <Button>Enviar</Button>
            </form>
        </WidthLimit>
        <style jsx>{`
            p {
                margin: 0;
                text-align: center;
                background-color: var(--primary-2);
                width: 80%;
                margin: 30px auto 0 auto;
                border-radius: 10px;
                font-size: 20px;
                padding: 10px 0;
                font-weight: bold;
            }

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
                box-sizing: border-box;
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
            span {
                font-weight: bold;
            }

            label {
                display: flex;
                background-color: var(--light-2);
                font-size: 18px;
                color: var(--font-color-1);
                margin-bottom: 20px;
                gap: 10px;
            }
            
            input {
                width: 100%;
                background-color: transparent;
                border: 0;
                outline: none;
                font-size: 18px;
                border-bottom: 2px solid var(--font-color-1);
                color: var(--font-color-2);
            }
        `}</style>
    </>);
}

export default Login;