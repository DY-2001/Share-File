import "tailwindcss/tailwind.css";
import "../../styles/globals.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5500";

function MyApp({ Component, pageProps }: any) {
  return (
    <div className="h-screen font-serif text-white bg-gray-800 grid place-items-center">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
