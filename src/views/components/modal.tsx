import { useState, useEffect, MutableRefObject } from "react";
import styles from "src/views/styles/modal.module.css";
import Button from "./button";
import WidthLimit from "../layouts/width-limit";

const getInititalModalRef = () => ({open: () => {}, close: () => {}});

const Modal = ({ modalRef, title, footer, children }: {
    modalRef: MutableRefObject<{ open: () => void, close: () => void }>
    title: string,
    footer?: React.ReactNode,
    children: React.ReactNode
}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const open = () => {
        setIsOpen(true)
        document.body.style.overflowY = "hidden";
    }

    const close = () => {
        document.body.style.overflowY = "auto";
        setIsOpen(false);
    }

    useEffect(() => {
        modalRef.current.open = open;
        modalRef.current.close = close;
    }, []);

    if(!isOpen) return <></>;
    return (
        <div className={styles.modal}>
            <WidthLimit>
                <section className={styles.dialog}>
                    <header className={styles.header}>
                        {title || <p></p>}
                        <button onClick={close}>&times;</button>
                    </header>
                    <main>
                        {children}
                    </main>
                    <footer>
                        {footer}
                        <Button onClick={close}>Cerrar</Button>
                    </footer>
                </section>
            </WidthLimit>
        </div>
    );
}

export {
    getInititalModalRef
}

export default Modal;