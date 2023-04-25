import { useWorkOrderCreation } from "./context";

const Upload = () => {
    const { uploadWorkorder } = useWorkOrderCreation();

    return (<>
        <button onClick={uploadWorkorder}>Guardar Orden de Trabajo</button>
        <style jsx>{`
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

export default Upload;