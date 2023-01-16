import Head from "next/head";
import React from "react";

import Home from "@/components/home";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>최태준 ♡ 이슬이</title>
        <meta
          name="description"
          content="최태준 ♡ 이슬이 2023년 2월 12일에 결혼합니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="최태준 ♡ 이슬이 청첩장" />
        <meta
          property="og:description"
          content="2월 12일(일) 18시 서울신라호텔 다이너스티홀"
        />
        <meta
          property="og:image"
          content="https://drive.google.com/uc?id=1N8Kx9ac2KtCGgheNP6GDrTAWknU4XlC-"
                   /* 1Cy4Op1Bqi0NmQetDa8SUjO0oUt3mllNt" */
        />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
