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
const SignedLayout = (links: NavbarLink[]) => Layout([...links, {
    url: "/auth/logout", text: "Cerrar Sesión"
}]);
const AdviserLayout = SignedLayout([
    {url: "/asesor/ordenes-trabajo", text: "Órdenes de Trabajo"},
    {url: "/asesor/usuarios", text: "Usuarios"}
]);
const TechnicianLayout = SignedLayout([
    {url: "/tecnico/tareas", text: "Calendario de Tareas"}
]);
const ClientLayout = SignedLayout([
    {url: "/cliente/reparaciones", text: "Reparaciones"}
]);

export {
    UnsignedLayout,
    AdviserLayout,
    TechnicianLayout,
    ClientLayout
};