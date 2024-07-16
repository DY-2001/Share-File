import "tailwindcss/tailwind.css";
import "../../styles/globals.css";
import axios from "axios";

axios.defaults.baseURL = "https://share-file-rv8o.onrender.com";

function MyApp({ Component, pageProps }: any) {
  return (
    <div className="h-screen font-serif text-white bg-gray-800 grid place-items-center">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
