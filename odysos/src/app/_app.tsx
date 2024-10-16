// import '../globals.css';
import type { AppProps } from 'next/app';
import './globals.css';


// Dies ist die Hauptkomponente, die jede Seite umschließt
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;