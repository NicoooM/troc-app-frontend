import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Plus_Jakarta_Sans } from "@next/font/google";
import { store } from "@/src/redux/store/store";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={jakarta.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
