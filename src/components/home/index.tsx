import { Copy, PinAlt } from "iconoir-react";
import Image from "next/image"
import React, {
} from "react";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

import mapPic from "@/public/photos/map.png";
import {
  Main,
  SectionHeader,
  SectionHr,
  TextSansStyle,
} from "./styles";
import {
  BRIDE_BANK,
  BRIDE_BANK_HOLDER,
  BRIDE_PARENTS, BRIDE_RELATION, BRIDE_SHORT_NAME,
  GREETING,
  GROOM_BANK,
  GROOM_BANK_HOLDER,
  GROOM_PARENTS, GROOM_RELATION, GROOM_SHORT_NAME,
  TITLE,
  WEDDING_DATE,
  WEDDING_VANUE,
  WEDDING_VANUE_ADDRESS,
  WEDDING_VANUE_KAKAO_LINK,
  WEDDING_VANUE_NAVER_LINK
} from "@/config";
import { toDateString } from "@/common/utils";
import Chat from "@/components/home/talk/Chat";
// import MyGallery from "./gallery";
import Cover from "@/components/home/cover";
import { Contact } from "@/components/home/Contact";
// import Direction from "@/components/home/direction";
import dynamic from "next/dynamic";
import { Gift } from "@/components/home/Gift";




const LiveButton = styled.button`
  padding: 8px 16px;
  border: 0;
  border-radius: 8px;
  margin: 12px 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  background: rgba(255, 136, 170);

  animation: color-change 1s infinite;

  @keyframes color-change {
    0% {
      background: rgba(255, 136, 170, 0.7);
    }
    50% {
      background: rgb(255, 136, 170);
    }
    100% {
      background: rgba(255, 136, 170, 0.7);
    }
  }
`;

const GreetingP = styled.p`
  @media screen and (max-width: 400px) {
      letter-spacing: -1px;
  }
  margin: 30px 0;
  white-space: pre-line;
`;






const Header = styled.h1`
  margin-top: 20px;
  font-size: 18px;
  white-space: pre-line;
`;

const ParentSection = styled.section`
    line-height: 2.0;
    text-align: center;
    margin-bottom: 50px;

    .text {

    }

    .parents {
        // small width [375px] may overflow
        letter-spacing: -1px;

        @include media-query(400px) {
            font-size: 14px;
        }
        
        i {  // 아들, 딸
            font-style: normal;
            text-align: center;
            display: inline-block;
            width: 2.7em;
        }
        span {
            font-weight: bold;
            display: inline-block;
            width: 10em;
            text-align: right;
            white-space: nowrap; /* 텍스트 줄바꿈 방지 */
        }
        b {
            font-weight: bold;
        }
        
    }

`;


const Direction = dynamic(
  () => {
    return import("@/components/home/direction");
  },
  { ssr: false }
);

const MyGallery = dynamic(
  () => {
    return import("@/components/home/gallery");
  },
  { ssr: false }
);


const Home = () => {
  return (
    <Main>
      <Cover />

      <Header>
        {toDateString(WEDDING_DATE, "%Y년 %m월 %d일 %a요일 %H:%M AM")}
        <br />
        {WEDDING_VANUE}
      </Header>

      <SectionHr />

      <SectionHeader>{TITLE}</SectionHeader>

      <GreetingP>
        {GREETING}
      </GreetingP>

      <ParentSection>
        <div className="row">
          <div className="parents text">
            <span>{GROOM_PARENTS}</span> <small>의 <i>{GROOM_RELATION}</i></small>
            <b>{GROOM_SHORT_NAME}</b>
            <br />
            <span>{BRIDE_PARENTS}</span> <small>의 <i>{BRIDE_RELATION}</i></small>
            <b>{BRIDE_SHORT_NAME}</b>
          </div>
        </div>
      </ParentSection>

      <Contact />
      <SectionHr />
      <MyGallery />

      <SectionHr />
      <Direction />
      <SectionHr />

      <Gift />
      <SectionHr />
      <SectionHeader>축하의 한마디</SectionHeader>
      <Chat />
    </Main>
  );
};

export default Home;
