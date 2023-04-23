import Button from "src/views/components/button";
import { Gutter, GutterContainer } from "src/views/components/gutters";
import WidthLimit from "src/views/layouts/width-limit";
import Point from "../components/point";
import { UnsignedLayout } from "../layouts";

const Home = () => {
    return (<>
        <UnsignedLayout>
            <main>
                <Hero/>
                <Services/>
            </main>
        </UnsignedLayout>
        <Footer/>
    </>);
}

const Hero = () => {
    return (<>
        <GutterContainer>
            <Gutter percentage={50}>
                <h2>¡Te <span>conectamos</span> con un <span>taller</span> en minutos!</h2>
                <div>
                    <p>Por medio de <span>AutoRepair</span> puedes encontrar el taller que se adapte a tus necesidades, como ubicación, presupuesto y tipo de raparación o mantenimiento. Además, podrás dar seguimiento en tiempo real al servicio.</p>
                    <Button>Accede a nuestros servicios</Button>
                </div>
            </Gutter>
            <Gutter percentage={50}>
                <img src="/banner.svg" alt="dos mecánicos trabajando"/>
            </Gutter>
        </GutterContainer>
        <style jsx>{`
            h2 {
                font-size: 30px;
                margin: 0 0 20px 0;
            }

            span {
                color: var(--primary-1);
                font-weight: bold;
            }

            div {
                width: 80%;
            }

            img {
                width: 100%;
                padding: 20px;
                box-sizing: border-box;
            }
        `}</style>
    </>);
}

const Services = () => {
    return (<>
        <h2><Point/> Nuestros Servicios</h2>
        <section>
            <ServiceCard
                imageURL="/progress.svg"
                title="Progreso de Reparación"
                description="Podrás ver cuál es el progreso de la reparación de tu vehículo y ver las tareas para que conozcas mejor el servicio."
            />
            <ServiceCard
                imageURL="/explaining.svg"
                title="Clientes"
                description="Funcionalidades para encontrar el taller que se adapte a tus necesidades y seguimiento en tiempo real de tu reparación."
            />
            <ServiceCard
                imageURL="/repairing.svg"
                title="Talleres"
                description="Manejar las reparaciones, dividiendolos en tareas para S organización y documentación del proceso."
            />
        </section>
        <style jsx>{`
            h2 {
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 0;
                font-size: 30px;
            }

            section {
                text-align: center;
            }
        `}</style>
    </>);
}

const ServiceCard = ({ imageURL, title, description }: {
    imageURL: string, title: string, description: string
}) => {
    return (<>
        <article>
            <img src={imageURL} alt={title}/>
            <h3><Point/> {title}</h3>
            <p>{description}</p>
        </article>
        <style jsx>{`
            article {
                background-color: var(--background-2);
                width: 250px;
                padding: 15px;
                border-radius: 10px;
                display: inline-block;
                margin: 10px;
                text-align: left;
            }
            
            img {
                max-width: 100%;
            }

            h3 {
                margin: 10px 0;
            }

            p {
                margin: 0;
                color: var(--font-color-2);
            }
        `}</style>
    </>);
}

const Footer = () => {
    return (<>
        <footer>
            <WidthLimit>
                <h2>Contáctanos</h2>
                <section>
                    <ContactMethod imageURL="/phone.svg" text="8888-8888"/>
                    <ContactMethod imageURL="/location.svg" text="Urb. Salomé Villareal # 67"/>
                    <ContactMethod imageURL="/email.svg" text="contact@autorepair.com"/>
                </section>
            </WidthLimit>
        </footer>
        <style jsx>{`
            footer {
                background-color: var(--background-2);
                padding: 15px;
                box-sizing: border-box;
            }

            h2 {
                font-size: 30px;
                margin: 0 0 5px 0;
            }

            section {
            }
        `}</style>
    </>);
}

const ContactMethod = ({imageURL, text}: {imageURL: string, text: string}) => {
    return (<>
        <article>
            <div>
                <img src={imageURL} alt={text}/>
                <span>{text}</span>
            </div>
        </article>
        <style jsx>{`
            article {
                font-size: 20px;
                width: 50%;
                display: inline-block;
                margin: 10px 0 0 0;
            }
            
            div {
                display: flex;
                align-items: center;
                gap: 5px;
            }

            img {
                width: 30px;
            }
        `}</style>
    </>);
}

export default Home;