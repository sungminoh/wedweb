import { GetServerSideProps } from "next";
import Head from "next/head";

import Live from "@/components/home/live";
import { BRIDE_NAME, GROOM_NAME, OG_IMAGE, WEDDING_DATE } from "@/config";
import { getData, toDateString } from "@/common/utils";

const LivePage = () => {
  return (
    <>
      <Head>
        <title>{`${GROOM_NAME} ♡ ${BRIDE_NAME} 결혼식 중계`}</title>
        <meta
          name="description"
          content={`${GROOM_NAME} ♡ ${BRIDE_NAME} ${toDateString(WEDDING_DATE, "%Y월 %일")}에 결혼합니다.`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${GROOM_NAME} ♡ ${BRIDE_NAME} 결혼식 중계`} />
        <meta property="og:description" content={`${toDateString(WEDDING_DATE, "%Y월 %일")}에 결혼합니다.`} />
        <meta
          property="og:image"
          content={OG_IMAGE}
        />
      </Head>
      <Live />
    </>
  );
};

export default LivePage;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getData();
  if (data?.live?.url.startsWith("http")) {
    return {
      redirect: {
        destination: data.live.url,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};