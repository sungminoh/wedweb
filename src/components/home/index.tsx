import { Copy, EmojiLookLeft, EmojiLookRight, PinAlt } from "iconoir-react";
import Image from "next/image"
import Link from "next/link";
import React, {
  useCallback,
  useRef,
  useState,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled, { css } from "styled-components";

import Modal from "@/components/common/Modal";
import coverPic from "@/public/photos/cover.jpg";
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
  BRIDE_DESC,
  BRIDE_NAME,
  BRIDE_TEL,
  GREETING,
  GROOM_BANK,
  GROOM_BANK_HOLDER,
  GROOM_DESC,
  GROOM_NAME,
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

const Header = styled.h1`
  display: inline-block;
  margin: 40px 0;

  font-size: 20px;
  font-weight: 500;
  line-height: 2.5;

  hr {
    width: 70%;
    margin: 0 auto;
    border: 0;
    border-top: 1px solid #ccc;
  }
`;

const CoverPicWrap = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 40px;
  border-radius: 30px;
  overflow: hidden;
  line-height: 0;
`;

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
  margin: 30px 0;
  white-space: pre-line;
`;

const CallWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 40px 0;
  > * {
    margin: 0 15px;
  }
`;

const CallButtonWrap = styled.div<{ bgColor: string }>`
  ${TextSansStyle}
  font-size: 13px;

  svg {
    display: block;
    margin: 0 auto;
    margin-bottom: 4px;
    width: 60px;
    height: 60px;
    color: white;
    padding: 15px;
    border-radius: 30px;
    background-color: ${({ bgColor }) => bgColor};
  }
`;

type CallButtonProps = {
  icon: React.ReactNode;
  bgColor: string;
  label: string;
};

const CallButton = ({ icon, bgColor, label }: CallButtonProps) => (
  <>
    <CallButtonWrap bgColor={bgColor}>
      {icon}
      {label}
    </CallButtonWrap>
  </>
);

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


const Home = () => {
  return (
    <Main>
      <Header>
        {GROOM_NAME}
        <hr />
        {BRIDE_NAME}
      </Header>
      <CoverPicWrap>
        <Image src={coverPic} priority={true} placeholder="blur" alt="" />
      </CoverPicWrap>

      <SectionHeaderA>
        {toDateString(WEDDING_DATE, "%Y년 %m월 %d일 %a요일 %p %H시")}
        <br />
        {WEDDING_VANUE}
      </SectionHeaderA>

      <SectionHr />

      <SectionHeader>{TITLE}</SectionHeader>

      <GreetingP>
        {GREETING}
      </GreetingP>

      <GreetingP>
        {GROOM_DESC}
        <br />
        {BRIDE_DESC}
      </GreetingP>

      <CallWrap>
        <a href={`tel:${GROOM_TEL}`}>
          <CallButton
            icon={<EmojiLookRight fr='groom_emoji'/>}
            bgColor="#abdaab"
            label="신랑측에 연락하기"
          />
        </a>
        <a href={`tel:${BRIDE_TEL}`}>
          <CallButton
            icon={<EmojiLookLeft fr='bride_emoji'/>}
            bgColor="#F7C8D3"
            label="신부측에 연락하기"
          />
        </a>
      </CallWrap>

      <SectionHr />

      <MyGallery/>

      <Link href="/live" passHref>
        <LiveButton>📹 결혼식 생중계 보러가기</LiveButton>
      </Link>
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
