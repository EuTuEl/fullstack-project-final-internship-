import "@/styles/globals.css";
import "@/styles/carousel.css"
import {GlobalProvider} from "@/context/GlobalContext";


export default function App({ Component, pageProps }) {
    return (
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
      // <Component {...pageProps} />
    );
}
