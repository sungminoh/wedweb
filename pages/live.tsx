import { GetServerSideProps } from "next";
import Head from "next/head";

import Live from "@/components/home/live";

const LivePage = () => {
  return (
    <>
      <Head>
        <title>최태준 ♡ 이슬이 결혼식 중계</title>
        <meta
          name="description"
          content="최태준 ♡ 이슬이 2월 12일에 결혼합니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="최태준 ♡ 이슬이 결혼식 중계" />
        <meta property="og:description" content="2월 12일에 결혼합니다." />
        <meta
          property="og:image"
          content="https://drive.google.com/uc?id=1N8Kx9ac2KtCGgheNP6GDrTAWknU4XlC-"
        />
      </Head>
      <Live />
    </>
  );
};

export default LivePage;

let liveUrlCache = { url: "", when: 0 };
const getLiveUrl = async () => {
  if (liveUrlCache.when < Date.now() - 10000) {
    const liveUrl = await fetch(
      "https://drive.google.com/uc?id=1N8Kx9ac2KtCGgheNP6GDrTAWknU4XlC-"
    )
      .then((r) => r.text())
      .then((url) => url.trim());
    liveUrlCache = { url: liveUrl, when: Date.now() };
  }
  return liveUrlCache.url;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const liveUrl = await getLiveUrl();
  if (liveUrl.startsWith("http")) {
    return {
      redirect: {
        destination: liveUrl,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
