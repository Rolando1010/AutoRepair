import Button from "./button";

const Form = ({ title, children, action, setDataOnSubmit }: {
    title: string,
    children: React.ReactNode,
    action?: string,
    setDataOnSubmit?: (data: any, reset: () => void) => void
}) => {
    const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const { target }: any = event;
        const data = Object.fromEntries(new FormData(target));
        setDataOnSubmit && setDataOnSubmit(data, () => target.reset());
    }

    return (<>
        <form method="POST" action={action} onSubmit={setDataOnSubmit ? submit : undefined}>
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
                box-sizing: border-box;
            }
        `}</style>
    </>);
}

export default Form;