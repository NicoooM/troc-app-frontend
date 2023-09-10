import "@/src/styles/main.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Plus_Jakarta_Sans } from "@next/font/google";
import { store } from "@/src/app/redux/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNProgress color={"#143109"} options={{ showSpinner: false }} />
      <main className={jakarta.className}>
        <Component {...pageProps} />
      </main>
      <ToastContainer pauseOnHover={false} position="bottom-center" />
    </Provider>
  );
}
