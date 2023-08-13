import { Copy, EmojiLookLeft, EmojiLookRight, PinAlt } from "iconoir-react";
import Image from "next/image"
import Link from "next/link";
import React, {
  useState,
} from "react";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

import mapPic from "@/public/photos/map.png";
import {
  Main,
  SectionHeader,
  SectionHeaderA,
  SectionHr,
  TextSansStyle,
} from "./styles";
import {
  BRIDE_BANK,
  BRIDE_BANK_HOLDER,
  BRIDE_DESC, BRIDE_NAME, BRIDE_PARENTS, BRIDE_RELATION, BRIDE_SHORT_NAME,
  BRIDE_TEL,
  GREETING,
  GROOM_BANK,
  GROOM_BANK_HOLDER,
  GROOM_DESC, GROOM_NAME, GROOM_PARENTS, GROOM_RELATION, GROOM_SHORT_NAME,
  GROOM_TEL,
  TITLE,
  WEDDING_DATE,
  WEDDING_VANUE,
  WEDDING_VANUE_ADDRESS,
  WEDDING_VANUE_DIRECTIONS,
  WEDDING_VANUE_KAKAO_LINK,
  WEDDING_VANUE_NAVER_LINK
} from "@/config";
import { toDateString } from "@/common/utils";
import Chat from "@/components/home/talk/Chat";
import MyGallery from "./gallery";
import Cover from "@/components/home/cover";
import { Contact } from "@/components/home/Contact";




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


const MapButton = styled.a`
  ${TextSansStyle}
  display: inline-block;
  padding: 8px 16px 8px 10px;
  border: 0;
  border-radius: 18px;
  margin: 0 10px;
  color: #666;
  font-size: 13px;
  text-decoration: none;
  background: #f3f3f3;
  line-height: 1.3;
  > svg {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: -4px 0;
    margin-right: 4px;
  }
`;

const GiveWrap = styled.div`
  display: inline-block;
  text-align: left;
  line-height: 2;
`;

const MapWrapA = styled.div`
  margin: 0 0 0 10px;
  text-align: left;
`;

const MapWrapB = styled.div`
  margin: 0 0 0 10px;
  text-align: left;
  font-size: 12px;
`;

const MapWrapBFooter = styled.span`
  font-size: 10px;
  font-weight: bold;
`;

const CopyTextButton = styled.button`
  padding: 0;
  border: none;
  background: none;

  svg {
    width: 20px;
    height: 20px;
    padding: 2px;
    color: #999;
    vertical-align: sub;
  }
`;
const CopyText = ({ text }: { text: string }) => {
  const handleCopyText = () => {
    const fallbackCopyClipboard = (value: string) => {
      const $text = document.createElement("textarea");
      document.body.appendChild($text);
      $text.value = value;
      $text.select();
      document.execCommand("copy");
      document.body.removeChild($text);
    };

    navigator.clipboard
      .writeText(text)
      .catch(() => fallbackCopyClipboard(text))
      .then(() => alert("계좌번호가 복사 되었습니다."));
  };
  return (
    <>
      {text}
      <CopyTextButton onClick={handleCopyText} aria-label="복사">
        <Copy fr='copy'/>
      </CopyTextButton>
    </>
  );
};


const Header = styled.h1`
  margin-top: 20px;
  font-size: 18px;
`;

const ParentSection = styled.section`
    line-height: 2.0;
    text-align: center;
    margin-bottom: 50px;

    .text {
        // small width [375px] may overflow
        letter-spacing: -1px;

        @include media-query(400px) {
            font-size: 14px;
        }
    }

    .parents {
        letter-spacing: -1px;
        i {  // 아들, 딸
            font-style: normal;
            text-align: center;
            display: inline-block;
            width: 2.7em;
        }
        span {
            font-weight: bold;
            display: inline-block;
            width: 8em;
            text-align: right;
        }
        b {
            font-weight: bold;
        }
        
    }

`;

const Home = () => {
  return (
    <Main>
      <Cover/>

      <Header>
        {toDateString(WEDDING_DATE, "%Y년 %m월 %d일 %a요일 %p %H시")}
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
            <span>{GROOM_PARENTS}</span> <small>의 <i>{GROOM_RELATION}</i></small> <b>{GROOM_SHORT_NAME}</b>
            <br/>
            <span>{BRIDE_PARENTS}</span> <small>의 <i>{BRIDE_RELATION}</i></small> <b>{BRIDE_SHORT_NAME}</b>
          </div>
        </div>
      </ParentSection>

      <Contact/>
      <SectionHr />

      <MyGallery/>

      {/*<Link href="/live" passHref>*/}
      {/*  <LiveButton>📹 결혼식 생중계 보러가기</LiveButton>*/}
      {/*</Link>*/}
      <SectionHr />
      <SectionHeader>오시는 길</SectionHeader>
      <Image src={mapPic} alt="" layout="responsive" objectFit="contain"/>
      <p style={{ whiteSpace: 'pre-line' }}>
        {WEDDING_VANUE_ADDRESS}
      </p>

      <MapWrapA>
        {WEDDING_VANUE_DIRECTIONS
          .map((direction, i) => {
            return <div key={`direction-${i}`}>
              <br/>{direction.method}<br/>
              <MapWrapB>
                <ul>
                  {
                    direction.ways.map((way, j) => <li key={`way-${i}-${j}`}>{way}</li>)
                  }
                </ul>
                <MapWrapBFooter>{direction.footer}</MapWrapBFooter>
              </MapWrapB>
            </div>
        })}
      </MapWrapA>

      <br />

      <MapButton href={WEDDING_VANUE_KAKAO_LINK} target='_blank'>
        <PinAlt fr='kakao_map' color="#1199EE" /> 카카오맵
      </MapButton>
      <MapButton href={WEDDING_VANUE_NAVER_LINK} target='_blank'>
        <PinAlt fr='naver_map' color="#66BB66" /> 네이버지도
      </MapButton>

      <br />
      <br />

      <SectionHr />
      <SectionHeader>💸 마음 전하실 곳</SectionHeader>
      <GiveWrap>
        <p>
          <strong>신랑측</strong> ({GROOM_BANK_HOLDER})
          <br />
          <CopyText text={GROOM_BANK} />
        </p>
        <p>
          <strong>신부측</strong> ({BRIDE_BANK_HOLDER})
          <br />
          <CopyText text={BRIDE_BANK} />
        </p>
      </GiveWrap>

      <SectionHr />
      <SectionHeader>축하의 한마디</SectionHeader>
      <Chat />
    </Main>
  );
};

export default Home;
