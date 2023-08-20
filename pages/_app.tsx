import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Reset } from "styled-reset";
import "../global.css";
import { HOSTNAME, NAVER_API_CLIENT_ID } from "@/config";
import '../src/styles/sass/style.scss';
import Script from "next/script";


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hostname.indexOf(HOSTNAME) < 0) return;
  }, []);

  return (
    <>
      <Reset />
      <Script strategy='beforeInteractive' src='https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=iqzth67per'/>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
