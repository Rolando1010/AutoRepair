import Link from "next/link";
import styles from "src/styles/navbar.module.css";
import WidthLimit from "./width-limit";

const Navbar = () => {
    return (<>
        <header className={styles.navbar}>
            <WidthLimit>
                <h1>AutoRepair</h1>
                <ul>
                    <li><Link href="/inicio-sesion"><span>Inicio de Sesión</span></Link></li>
                </ul>
            </WidthLimit>
        </header>
    </>);
}

export default Navbar;