import { Copy, EmojiLookLeft, EmojiLookRight, PinAlt } from "iconoir-react"; 
import Image from "next/image";
import Link from "next/link";
import React, {
  MouseEventHandler, 
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled, { css } from "styled-components";
import useSWR from "swr";

import Modal from "@/components/common/Modal";
import timeDiffFormat from "@/common/utils/timeDiffFormat";
import { useSessionStorage } from "@/common/hooks/useStorage";
import coverPic from "@/public/photos/cover_min.jpg";
import mapPic from "@/public/photos/map.gif";
import { GetTalkListResponse, Party, Talk } from "@/talk/types";
import {
  BoxShadowStyle,
  BubbleHeadStyle,
  Main,
  SectionHeader,
  SectionHeaderA,
  SectionHr,
  TextSansStyle,
} from "./styles"; 
import WriteTalk from "./talk/WriteTalk";
import EditTalk from "./talk/EditTalk";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

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

const PhotoGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;

  li {
    height: 200px;
    flex-grow: 1;
    margin: 4px;
  }

  img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    object-position: center top;
    vertical-align: bottom;
  }
`;

const SliderWrap = styled.div<{ isZoomed: boolean }>`
  height: 100%;
  ${({ isZoomed }) =>
    isZoomed &&
    css`
      * {
        overflow: visible !important;
      }
    `}
  .slick-track {
    display: flex;
  }
  .slick-track .slick-slide {
    display: flex;

    ${({ isZoomed }) =>
      isZoomed &&
      css`
        &:not(.slick-active) {
          visibility: hidden;
        }
      `}

    height: auto;
    align-items: center;
    justify-content: center;
    div {
      outline: none;
    }
    img {
      width: 100%;
    }
  }
`;

type PinchPhotoProps = { src: string; onZoom: (isZoomed: boolean) => void };
const PinchPhoto = ({ src, onZoom }: PinchPhotoProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const pz = useRef<QuickPinchZoom>(null);
  const handleUpdate = useCallback(
    ({ x, y, scale }) => {
      if (!imgRef.current) return;
      const value = make3dTransformValue({ x, y, scale });
      imgRef.current.style.setProperty("transform", value);
      onZoom(scale > 1);
    },
    [onZoom]
  );

  return (
    <QuickPinchZoom ref={pz} onUpdate={handleUpdate} draggableUnZoomed={false}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt="" />
    </QuickPinchZoom>
  );
};

type PhotoGalleryProps = { initialSlide?: number; onClose: () => void };
const PhotoGallery = ({ initialSlide, onClose }: PhotoGalleryProps) => {
  const [isZoomed, setZoomed] = useState(false);
  return (
    <SliderWrap isZoomed={isZoomed} onClick={onClose}>
      <Slider
        initialSlide={initialSlide || 0}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={false}
        dots={false}
      >
        {Array.from(Array(15), (_, i) => i + 1).map((i) => (
          <div key={i}>
            <PinchPhoto onZoom={setZoomed} src={`/photos/p${i}.jpg`} />
          </div>
        ))}
      </Slider>
    </SliderWrap>
  );
};

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
        <Copy />
      </CopyTextButton>
    </>
  );
};

const WriteSectionSubHeader = styled.div`
  padding: 0 20px;
  margin-top: -68px;
  color: #666;
  p:first-child {
    float: left;
  }
  p:last-child {
    float: right;
  }
`;

const WriteButton = styled.button<{ visible: boolean }>`
  ${TextSansStyle}
  ${({ visible }) =>
    visible
      ? css`
          bottom: 45px;
        `
      : css`
          bottom: -100px;
        `}

  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  width: calc(100% - 40px);
  max-width: calc(400px - 40px);
  padding: 16px;
  border: 0;
  border-radius: 8px;

  color: white;
  font-size: 16px;
  font-weight: bold;
  background: rgba(255, 136, 170, 0.9);

  ${BoxShadowStyle}

  transition: bottom 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
`;

const TalkWrap = styled.div`
  position: relative;
  padding: 0 20px;
  margin: 20px 0;
`;

const WriteButtonTrigger = styled.div`
  position: absolute;
  top: 100px;
  height: 100%;
`;

const TalkBubbleWrap = styled.div<{
  party: Party;
  color: string;
  selected: boolean;
}>`
  ${TextSansStyle}
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  svg {
    ${({ party, color }) => BubbleHeadStyle(party, color)}
  }
  > div {
    ${({ party }) =>
      party === "BRIDE"
        ? css`
            margin-right: 44px;
            text-align: right;
          `
        : css`
            margin-left: 44px;
            text-align: left;
          `}
    line-height: 1.3;
    div.bubble-info-wrap {
      display: flex;
      ${({ party }) =>
        party === "BRIDE"
          ? css`
              flex-direction: row-reverse;
            `
          : css`
              flex-direction: row;
            `}

      p {
        white-space: pre-wrap;
        text-align: left;
        word-break: break-all;
        overflow-wrap: break-word;
        display: inline-block;
        padding: 8px 12px;
        margin: 4px 0 0 0;
        ${({ party }) =>
          party === "BRIDE"
            ? css`
                border-radius: 20px 4px 20px 20px;
                margin-left: 3px;
              `
            : css`
                border-radius: 4px 20px 20px 20px;
                margin-right: 3px;
              `}
        background: #eee;
        ${({ selected }) =>
          selected &&
          css`
            background: #ddd;
          `}
      }
      small {
        align-self: flex-end;
        flex-shrink: 0;
        color: #999;
        font-size: 11px;
      }
    }
    .edit {
      font-size: 0.9em;
      color: #999;
      text-decoration: underline;
    }
  }
`;

type TalkBubbleProps = {
  talk: Talk;
  selected: boolean;
  onBubbleClick: (id: string | undefined) => void;
  onEditClick: (id: string) => void;
};
const TalkBubble = ({
  talk,
  selected,
  onBubbleClick,
  onEditClick,
}: TalkBubbleProps) => {
  const handleBubbleClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    onBubbleClick(talk.id);
  };
  const handleBubbleOutsideClick: MouseEventHandler = (e) =>
    onBubbleClick(undefined);
  const handleEditClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    onEditClick(talk.id);
  };
  const editBtn = (
    <span className="edit" onClick={handleEditClick}>
      수정하기
    </span>
  );
  return (
    <TalkBubbleWrap party={talk.party} color={talk.color} selected={selected}>
      {talk.party === "BRIDE" ? <EmojiLookLeft /> : <EmojiLookRight />}
      <div onClick={handleBubbleOutsideClick}>
        {selected && talk.party === "BRIDE" && <>{editBtn} </>}
        {talk.author}
        {selected && talk.party === "GROOM" && <> {editBtn}</>}
        <div className="bubble-info-wrap">
          <p onClick={handleBubbleClick}>{talk.msg}</p>
           <small>
            {!talk.published
              ? "검수중"
              : timeDiffFormat(new Date(talk.created)) 
            }
          </small> 
        </div>
      </div>
    </TalkBubbleWrap>
  );
};

const ThankYou = styled.div`
  padding: 60px;
  color: #666;
`;

const Home = () => {
  const [writeDone, setWriteDone] = useSessionStorage("talk.writedone");
  const {
    data: talkListResp,
    error,
    mutate,
  } = useSWR<GetTalkListResponse>("/api/talk/list");

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showWriteTalkModal, setShowWriteTalkModal] = useState(false);
  const [showEditTalkModal, setShowEditTalkModal] = useState<Talk>();
  const [isWriteButtonShown, setWriteButtonShown] = useState(false);
  const [lastClickedGalleryItem, setLastClickedGalleryItem] =
    useState<number>();
  const [selectedTalkId, setSelectedTalkId] = useState<string>();

  const writeButtonTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!writeButtonTriggerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setWriteButtonShown(entry.isIntersecting);
    });
    observer.observe(writeButtonTriggerRef.current);

    return () => observer.disconnect();
  }, [writeButtonTriggerRef]);

  const handlePhotoClick = (i: number) => {
    setLastClickedGalleryItem(i);
    setShowGalleryModal(true);
  };

  const handleGalleryModalClose = () => setShowGalleryModal(false);

  const handleTalkBubbleClick = (id: string | undefined) =>
    setSelectedTalkId(id);

  const handleWriteButtonClick = () => setShowWriteTalkModal(true);
  const handleWriteTalk = (_: string) => {
    setWriteDone("done");
    setShowWriteTalkModal(false);
    mutate();
  };
  const handleWriteTalkModalClose = () => setShowWriteTalkModal(false);

  const handleTalkEditClick = (id: string) => {
    const talk = talkListResp?.talks?.find((t) => t.id === id);
    if (!talk) return;
    setShowEditTalkModal(talk);
    setSelectedTalkId(undefined);
  };
  const handleEditTalk = (_: string) => {
    setWriteDone("done");
    setShowEditTalkModal(undefined);
    mutate();
  };
  const handleEditTalkModalClose = () => setShowEditTalkModal(undefined);

  return (
    <Main>
      <Header>
        최태준
        <hr />
        이슬이
      </Header>
      <CoverPicWrap>
        <Image src={coverPic} priority={true} placeholder="blur" alt="" />
      </CoverPicWrap>
      
      <SectionHeaderA>
        2023년 2월 12일 일요일 오후 6시
        <br />
        서울신라호텔 다이너스티홀
      </SectionHeaderA> 
      
      <SectionHr />

      <SectionHeader>결혼합니다♡</SectionHeader> 
      
      <GreetingP>
        만날 때의 설렘보다
        <br />
        집 앞에서 헤어질 때의 아쉬움이 커질 무렵
        <br />
        새로운 설렘으로 시작하려 합니다.
        <br />
        아름다운 시작을 위해 가까이에서 축복해 주시면
        <br />
        변함없는 믿음과 사랑으로
        <br />
        하루하루 감동하며 살겠습니다.
         <br />
      </GreetingP>
      
      <GreetingP>
        최갑현 · 이영희의 장남 태준
        <br />
        이희봉 · 김재락의 장녀 슬이
      </GreetingP>
      
      <CallWrap>
        <a href="tel:01093310848">
          <CallButton
            icon={<EmojiLookRight />}
            bgColor="#abdaab"
            label="신랑측에 연락하기"
          />
        </a>
        <a href="tel:01028205242">
          <CallButton
            icon={<EmojiLookLeft />}
            bgColor="#F7C8D3"
            label="신부측에 연락하기"
          />
        </a>
      </CallWrap>
      <SectionHr />
      <PhotoGrid>
        {Array.from(Array(15), (_, i) => i).map((i) => (
          <li key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              role="button"
              src={`/photos/p${i + 1}.jpg`}
              onClick={() => handlePhotoClick(i)}
              loading="lazy"
              alt=""
            />
          </li>
        ))}
      </PhotoGrid>
      {showGalleryModal && (
        <Modal handleClose={handleGalleryModalClose}>
          <PhotoGallery
            initialSlide={lastClickedGalleryItem}
            onClose={handleGalleryModalClose}
          />
        </Modal>
      )}
      <SectionHr />
      <SectionHeader>오시는 길</SectionHeader>
      <Image src={mapPic} width="650px" alt="" />
      <p>
        서울 중구 동호로 249
        <br />
        서울신라호텔 다이너스티홀
        <br />
      </p>
   
 
      
      <MapWrapA>
      <br/>자가용 이용시<br/>
                    
      <MapWrapB> 
        <div>
          분당 방면: 한남대교→장충단길→서울신라호텔 <br /> 
          강남 방면: 동호대교→장충체육관 앞 사거리에서 좌회전→서울신라호텔 <br /> 
          용산 방면: 남산2호터널 통과 후 좌회전→서울신라호텔 <br />
       </div>
      </MapWrapB>
     
         <br/>버스 이용시<br/>
      
      <MapWrapB> 
       <div>
         장충체육관 앞 하차 (노선번호:144, 301, 7212) <br />
       </div>
      </MapWrapB>
      
         <br/>지하철 이용시<br/>
        
      <MapWrapB> 
         <div>
          지하철3호선 동대입구역 5번출구 <br />
         </div> 
      </MapWrapB>
      
         <br/>서울신라호텔 셔틀버스 이용시 <br/>
        
      <MapWrapB> 
         <div>
          관내 셔틀: 호텔 로비→신라 면세점→호텔 고객 주차장→ 호텔 정문 <br />
         </div>
      </MapWrapB>     
      </MapWrapA> 
      
      <br />
      
      <MapButton href="https://place.map.kakao.com/10527133">
        <PinAlt color="#1199EE" /> 카카오맵
      </MapButton>
      <MapButton href="https://map.naver.com/v5/entry/place/12159697">
        <PinAlt color="#66BB66" /> 네이버지도
      </MapButton>
      
      <br />
      <br />
      
      <SectionHr />
      <SectionHeader>💸 마음 전하실 곳</SectionHeader>
      <GiveWrap>
        <p>
          <strong>신랑측</strong> (최태준)
          <br />
          <CopyText text="국민은행 758601-00-075254" />
        </p>
        <p>
          <strong>신부측</strong> (이슬이)
          <br />
          <CopyText text="스탠다드차타드 632-20-491696" />
        </p>
      </GiveWrap>
      
      <SectionHr />
      <SectionHeader>축하의 한마디</SectionHeader>
      <WriteSectionSubHeader>
        <p>신랑측</p>
        <p>신부측</p>
      </WriteSectionSubHeader>
      <div style={{ clear: "both" }} />
      <TalkWrap>
        <WriteButtonTrigger ref={writeButtonTriggerRef} />
        {talkListResp?.talks.map((talk) => (
          <TalkBubble
            key={talk.id}
            talk={talk}
            selected={talk.id === selectedTalkId}
            onBubbleClick={handleTalkBubbleClick}
            onEditClick={handleTalkEditClick}
          />
        ))}
      </TalkWrap>
      <ThankYou>{writeDone ? "감사합니다." : ""}</ThankYou>
      {!writeDone && (
        <WriteButton
          visible={isWriteButtonShown}
          onClick={handleWriteButtonClick}
        >
          😍 나도 한마디
        </WriteButton>
      )}
      {showWriteTalkModal && (
        <Modal handleClose={handleWriteTalkModalClose}>
          <WriteTalk onWrite={handleWriteTalk} />
        </Modal>
      )}
      {showEditTalkModal && (
        <Modal handleClose={handleEditTalkModalClose}>
          <EditTalk talk={showEditTalkModal} onEdit={handleEditTalk} />
        </Modal>
      )}
    </Main>
  );
};

export default Home;
