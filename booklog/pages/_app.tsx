import type { AppProps } from "next/app";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <style global jsx>{`
        html,
        body,
        div#__next,
        div#__next > div {
          height: 100%;
          width: 100%;
          margin: 0px;
        }
      `}</style>
    </>
  );
}

export default MyApp;
