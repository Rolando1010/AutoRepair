const WidthLimit = ({ children }: {children: React.ReactNode}) => {
    return (<>
        <div>
            {children}
        </div>
        <style jsx>{`
            div {
                max-width: 1000px;
                margin: auto;
                padding: 0 15px;
            }
        `}</style>
    </>);
}

export default WidthLimit;