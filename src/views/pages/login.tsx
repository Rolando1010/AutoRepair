import { UnsignedLayout } from "../layouts";
import Form from "../components/form";
import { LabelInput } from "../components/input";

const Login = ({ error }: {error?: string}) => {
    return (<>
        <UnsignedLayout>
            {error && <p>{error}</p>}
            <Form title="Inicio de Sesión" action="/auth/login">
                <LabelInput label="Nombre" type="text" name="name"/>
                <LabelInput label="Contraseña" type="password" name="password"/>
            </Form>
        </UnsignedLayout>
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
        `}</style>
    </>);
}

export default Login;