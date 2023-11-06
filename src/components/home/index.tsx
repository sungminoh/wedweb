import React, {
} from "react";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

import {
  Main,
  SectionHeader,
  SectionHr, TextSansStyle,
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
// import Chat from "@/components/home/talk/Chat";
// import MyGallery from "./gallery";
import Cover from "@/components/home/cover";
import { Contact } from "@/components/home/Contact";
// import Direction from "@/components/home/direction";
import { atcb_action } from "add-to-calendar-button";
import dynamic from "next/dynamic";
import { Gift } from "@/components/home/Gift";
import Snow from "@/components/common/Snow";
import { PreviewCollapsible } from "@/components/common/PreviewCollapsible";
import { isBride } from "@/utils";
import { CalendarPlus } from "iconoir-react";




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






const Header = styled.div`
  font-weight: bold;
  h2 {
    letter-spacing: -1px;
    margin-top: 30px;
    margin-bottom: 0px;
    font-size: 20px;
  }
  h1 {
    white-space: pre-line;
    font-size: 22px;
    line-height: 30px;
  }
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
            width: 8.5em;
            text-align: right;
            white-space: nowrap; /* 텍스트 줄바꿈 방지 */
        }
        b {
            font-weight: bold;
        }
        
    }

`;

const AddToCalendar = styled.div`
  ${TextSansStyle}
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    padding: 8px 16px 8px 10px;
    border: 0;
    border-radius: 18px;
    color: #666;
    font-size: 13px;
    text-decoration: none;
    background: #f3f3f3;
    line-height: 1.3;
    > svg, img {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin: -4px 0;
      margin-right: 4px;
      border-radius: 9px;
    }
  }
`


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

const Chat = dynamic(
  () => {
    return import("@/components/home/talk/Chat");
  },
  { ssr: false }
);


const Home = () => {
  return (
    <Main>
      <Snow/>
      <Cover />

      <Header>
        <h2>{toDateString(WEDDING_DATE, "%Y년 %m월 %d일 %a요일 오전 %H시")}</h2>
        <h1>{WEDDING_VANUE}</h1>
      </Header>

      <AddToCalendar>
        <div onClick={(e) => {
          const config = {
            name: isBride() ? "희재 결혼" : "성민 결혼",
            description: window.location.href,
            startDate: "2023-12-16",
            startTime: "11:00",
            endDate: "2023-12-16",
            endTime: "13:00",
            timeZone: "Asia/Seoul",
            location: "서울대학교 이라운지",
            iCalFileName: "sungmin-heejae-wedding",
            options: ['Apple', 'Google', 'Outlook.com', 'iCal'],
            // language: 'ko',
            size: '4',
            // customLabels: {"close":"닫기"},
          }
          return atcb_action(config, e.button)
        }}> <CalendarPlus/> 캘린더에 추가 </div>
      </AddToCalendar>

      {/*<SectionHr />*/}
      {/*<SectionHeader>{TITLE}</SectionHeader>*/}

      <GreetingP>
        {GREETING}
      </GreetingP>

      <ParentSection>
        <div className="row">
          <div className="parents text">
            <span>{GROOM_PARENTS}</span> <small>의 <i>{GROOM_RELATION}</i> </small>
            <b>{GROOM_SHORT_NAME}</b>
            <br />
            <span>{BRIDE_PARENTS}</span> <small>의 <i>{BRIDE_RELATION}</i> </small>
            <b>{BRIDE_SHORT_NAME}</b>
          </div>
        </div>
      </ParentSection>

      <Contact />
      <SectionHr />
      <SectionHeader>사진첩</SectionHeader>
      <PreviewCollapsible><MyGallery /></PreviewCollapsible>

      <SectionHr />
      <SectionHeader>오시는 길</SectionHeader>
      <Direction />

      <SectionHr />
      <SectionHeader>마음 전하실 곳</SectionHeader>
      <Gift />

      <SectionHr />
      <SectionHeader>축하의 한마디</SectionHeader>
      <Chat />
    </Main>
  );
};

export default Home;
