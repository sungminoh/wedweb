import Head from "next/head";
import React from "react";

import Home from "@/components/home";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>이종찬 ♡ 이현경</title>
        <meta
          name="description"
          content="이종찬 ♡ 이현경 4월 9일에 결혼합니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="이종찬 ♡ 이현경 청첩장" />
        <meta
          property="og:description"
          content="4월 9일 17시에 결혼합니다."
        />
        <meta
          property="og:image"
          content="https://drive.google.com/uc?id=1F7iGw2AJVJXfVa8TSMqQ_r8a3C_psPib"
        />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
