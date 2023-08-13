import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Reset } from "styled-reset";
import "../global.css";
import { HOSTNAME } from "@/config";
import '../src/styles/sass/style.scss';


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hostname.indexOf(HOSTNAME) < 0) return;
  }, []);

  return (
    <>
      <Reset />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
