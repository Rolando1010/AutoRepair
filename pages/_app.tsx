import type { AppProps } from "next/app";
import Head from "next/head";
import "src/views/styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
	return (<>
		<Head>
			<title>AutoRepair</title>
			<meta name="description" content="Taller de reparación de vehículos"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<link rel="icon" href="/mechanic.png"/>
		</Head>
		<Component {...pageProps}/>
	</>);
}

export default App;