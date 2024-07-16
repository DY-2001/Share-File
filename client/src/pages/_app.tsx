import "tailwindcss/tailwind.css";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <div className="h-screen font-serif text-white bg-gray-900 grid place-items-center">
        <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
