const Button = ({ children }: { children: React.ReactNode }) => {
    return (<>
        <button>{children}</button>
        <style jsx>{`
            button {
                background-color: var(--primary-2);
                border: 0;
                color: var(--font-color-1);
                font-size: 16px;
                padding: 10px 25px;
                font-size: 18px;
                border-radius: 10px;
                cursor: pointer;
            }

            button:hover, button:focus {
                background-color: var(--primary-1);
            }
        `}</style>
    </>);
}

export default Button;