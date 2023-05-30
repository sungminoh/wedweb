import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Reset } from "styled-reset";
import "../global.css";
import { HOSTNAME, LOGROCKET } from "@/config";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hostname.indexOf(HOSTNAME) < 0) return;

    (async () => {
      const LogRocket = (await import("logrocket")).default;
      LogRocket.init(LOGROCKET);
    })();
  }, []);

  return (
    <>
      <Reset />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
