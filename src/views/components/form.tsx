import Button from "./button";

const Form = ({ title, children, action, onSubmit }: {
    title: string,
    children: React.ReactNode,
    action?: string,
    onSubmit?: React.FormEventHandler<HTMLFormElement>
}) => {
    return (<>
        <form method="POST" action={action} onSubmit={onSubmit}>
            <h2>{title}</h2>
            {children}
            <Button>Enviar</Button>
        </form>
        <style jsx>{`
            h2 {
                margin: 0;
                color: var(--primary-1);
                font-size: 25px;
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

export default Form;