import { Gutter, GutterContainer } from "src/components/gutters";

const Home = () => {
    return (<>
        <Navbar/>
       <Hero/> 
    </>);
}

const Hero = () => {
    return (<>
        <GutterContainer>
            <Gutter percentage={50}>
                <article>
                    <h2>¡Te <span>conectamos</span> con un <span>taller</span> en minutos!</h2>
                    <div>
                        <p>Por medio de <span>AutoRepair</span> puedes encontrar el taller que se adapte a tus necesidades, como ubicación, presupuesto y tipo de raparación o mantenimiento. Además, podrás dar seguimiento en tiempo real al servicio.</p>
                        <button>Accede a nuestros servicios</button>
                    </div>
                </article>
            </Gutter>
            <Gutter percentage={50}>
                <article>
                    <img src="/banner.svg" alt="dos mecánicos trabajando"/>
                </article>
            </Gutter>
        </GutterContainer>
        <style jsx>{`
            article {
                padding: 20px;
            }

            h2 {
                font-size: 30px;
            }

            span {
                color: var(--primary-1);
                font-weight: bold;
            }

            div {
                width: 80%;
                margin: auto;
                text-align: center;
            }

            button {
                background-color: var(--primary-2);
                border: 0;
                color: var(--font-color-1);
                font-size: 16px;
                padding: 13px 20px;
                font-size: 18px;
                border-radius: 10px;
                cursor: pointer;
            }

            button:hover, button:focus {
                background-color: var(--primary-1);
            }

            img {
                width: 100%;
            }
        `}</style>
    </>);
}

const Navbar = () => {
    return (<>
        <header>
            <h1>AutoRepair</h1>
            <ul>
                <li>Cliente</li>
                <li>Taller</li>
                <li>Soporte</li>
            </ul>
        </header>
        <style jsx>{`
            header {
                background-color: var(--background-2);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px;
            }

            h1 {
                margin: 0;
                font-size: 24px;
                color: var(--primary-1);
            }

            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                gap: 15px;
            }
        `}</style>
    </>);
}

export default Home;