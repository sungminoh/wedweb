import Head from "next/head";
import React from "react";

import Home from "@/components/home";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>장윤석 ♡ 서보라</title>
        <meta
          name="description"
          content="장윤석 ♡ 서보라 2022년 12월 4일에 결혼합니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        
        <meta property="og:title" content="장윤석 ♡ 서보라 청첩장" />
        <meta name="twitter:title" content="장윤석 ♡ 서보라 청첩장" />
            
        <meta
          property="og:description"
          content="장윤석 ♡ 서보라 2022년 12월 4일 12시 20분, 잠실 더컨벤션 아모르홀에서 결혼합니다."
        />
        <meta 
          name="twitter:description"
          content="장윤석 ♡ 서보라 2022년 12월 4일 12시 20분, 잠실 더컨벤션 아모르홀에서 결혼합니다."
        />
        <meta
          property="og:image"
          content="https://yunseok-paula-wedding.vercel.app/photos/cover_min.jpg"
        />
        <meta
          name="twitter:image"
          content="https://yunseok-paula-wedding.vercel.app/photos/cover_min.jpg"
        />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
