import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Page } from "../components/Page";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Page>
        <Header />
        <Component {...pageProps} />
      </Page>
    </>
  );
}

export default MyApp;
