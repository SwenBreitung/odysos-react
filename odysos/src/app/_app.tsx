// import '../globals.css';
import type { AppProps } from 'next/app';
import './globals.css';
import { LayoutProvider } from '../app/utils/layoutServies'; // Pfad anpassen

// Dies ist die Hauptkomponente, die jede Seite umschließt
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
 
    <LayoutProvider>
      <Component {...pageProps} />
    </LayoutProvider>
 
}

export default MyApp;