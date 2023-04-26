import Button from "src/views/components/button";
import { Gutter, GutterContainer } from "src/views/components/gutters";
import WidthLimit from "src/views/layouts/width-limit";
import Point from "../components/point";
import { UnsignedLayout } from "../layouts";
import Link from "next/link";

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
                title="Reparaciones"
                description="Podrás ver cuál es el progreso de la reparación de tu vehículo y ver las tareas para que conozcas mejor el servicio."
                link="/cliente"
            />
            <ServiceCard
                imageURL="/explaining.svg"
                title="Tareas"
                description="Reparaciones de vehículos separadas en tareas individuales para técnicos, con seguimiento de proceso de reparación"
                link="/tecnico"
            />
            <ServiceCard
                imageURL="/repairing.svg"
                title="Órdenes de trabajo"
                description="Gestión de las reparaciones de los vehículos de los clientes en órdenes de trabajo con tareas por técnicos."
                link="/asesor/ordenes-trabajo"
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

const ServiceCard = ({ imageURL, title, description, link }: {
    imageURL: string, title: string, description: string, link: string
}) => {
    return (<>
        <Link href={link}>
            <article>
                <img src={imageURL} alt={title}/>
                <h3><Point/> {title}</h3>
                <p>{description}</p>
            </article>
        </Link>
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
                color: var(--font-color-1);
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
                margin-top: 30px;
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