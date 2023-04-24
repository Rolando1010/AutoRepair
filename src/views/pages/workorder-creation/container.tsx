const Container = ({ title, children, headerComplement }: {
    title: string,
    headerComplement?: React.ReactNode,
    children: React.ReactNode
}) => {
    return (<>
        <article>
            <header>
                <h3>{title}</h3>
                {headerComplement}
            </header>
            <div>
                {children}
            </div>
        </article>
        <style jsx>{`
            article {
                border-radius: 10px;
                background-color: var(--background-2);
                margin: 20px 0;
            }

            header, div {
                padding: 10px 15px;
            }

            header {
                border-bottom: 2px solid var(--background-1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            div {
                padding-top: 20px;
            }

            h3 {
                margin: 0;
                font-size: 22px;
                color: var(--primary-1);
            }
        `}</style>
    </>);
}

export default Container;