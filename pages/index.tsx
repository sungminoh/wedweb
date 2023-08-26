import Head from "next/head";
import React from "react";
import { GROOM_NAME, BRIDE_NAME, WEDDING_VANUE, WEDDING_DATE, OG_IMAGE } from "@/config";
import { toDateString } from "@/common/utils";
import Home from "@/components/home";
import { isBride } from "@/utils";

const HomePage = () => {
  const title = isBride()
    ? `${BRIDE_NAME} ♡ ${GROOM_NAME}`
    : `${GROOM_NAME} ♡ ${BRIDE_NAME}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`${title} ${toDateString(WEDDING_DATE, "%Y년 %m월 %d일")}에 결혼합니다.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title} 청첩장`} />
        <meta
          property="og:description"
          content={`${toDateString(WEDDING_DATE, "%m월 %d일(%a) %H시")} ${WEDDING_VANUE}`}
        />
        <meta
          property="og:image"
          content={OG_IMAGE}
        />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
