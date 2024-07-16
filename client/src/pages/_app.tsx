import "tailwindcss/tailwind.css";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return <div><Component {...pageProps} /></div>;
}

export default MyApp;