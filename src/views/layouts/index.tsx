import Navbar, { type NavbarLink } from "./navbar";
import WidthLimit from "./width-limit";

const Layout = (links: NavbarLink[]) => ({ children }: { children: React.ReactNode}) => {
    return (<>
        <Navbar links={links}/>
        <WidthLimit>
            {children}
        </WidthLimit>
    </>);
}

const UnsignedLayout = Layout([{url: "/inicio-sesion", text: "Inicio de Sesión"}]);
const AdviserLayout = Layout([
    {url: "/asesor/ordenes-trabajo", text: "Órdenes de Trabajo"},
    {url: "/asesor/usuarios", text: "Usuarios"}
]);
const TechnicianLayout = Layout([
    {url: "/tecnico/tareas", text: "Calendario de Tareas"}
]);

export {
    UnsignedLayout,
    AdviserLayout,
    TechnicianLayout
};