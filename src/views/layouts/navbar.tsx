import Link from "next/link";
import styles from "src/views/styles/navbar.module.css";
import WidthLimit from "./width-limit";

export type NavbarLink = {
    url: string,
    text: string
}

const Navbar = ({ links }: {links: NavbarLink[]}) => {
    return (<>
        <header className={styles.navbar}>
            <WidthLimit>
                <h1>AutoRepair</h1>
                <ul>
                    {links.map(({url, text}, index) =>
                        <li key={`link-${index}`}>
                            <Link href={url}>
                                <span>{text}</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </WidthLimit>
        </header>
    </>);
}

export default Navbar;