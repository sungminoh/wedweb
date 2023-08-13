import { Copy, EmojiLookLeft, EmojiLookRight, Phone } from "iconoir-react";
import styled, { css, keyframes } from "styled-components";
import { TextSansStyle } from "@/components/home/styles";
import { BRIDE_KAKAO, BRIDE_TEL, GROOM_KAKAO, GROOM_TEL } from "@/config";
import { useState } from "react";


const CallWrap = styled.div`
  display: flex;
  height: 100px;
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
  // transition: all .5s;

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
  span {
    margin: 0;
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


const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`
const ContactLinks = styled.div<{
  show: boolean,
  seconds: number,
}>`
  margin: 0px;
  padding: 0px;
  width: ${({show}) => (show ? '100px' : '0%')};
  transition: width ${({seconds}) => `${seconds}s ease`};
  ${
    ({show, seconds}) => show
      ? css`
        animation: ${fadeIn} ${seconds}s forwards;
      ` : css`
        animation: ${fadeOut} ${seconds}s forwards;
      `
  }
`;

const ContactButton = styled.a<{ bgColor: string}>`
  ${TextSansStyle}
  overflow: hidden;
  text-wrap: nowrap;
  
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  
  padding: 4px 8px 4px 5px;
  border: 0;
  border-radius: 18px;
  margin: 0 0 5px 0;
  color: #666;
  font-size: 13px;
  text-decoration: none;
  background: ${({ bgColor }) => bgColor};
  line-height: 1.3;
  > img {
    width: 18px;
    height: 18px;
    border-radius: 9px;
    margin: -4px 0;
    margin-right: 5px;
  }
  > svg {
    display: block;
    width: 18px;
    height: 18px;
    // border-radius: 9px;
    color: black;
    padding: 2px;
    margin: -4px 0;
    margin-right: 5px;
  }
`;


export const Contact = () => {
  const [showLinks, setShowLinks] = useState('');

  return (
    <>
    <CallWrap>
      <div onClick={x => setShowLinks(showLinks == 'groom' ? '' : 'groom')}>
        <CallButton
          icon={<EmojiLookRight fr='groom_emoji'/>}
          bgColor="#abdaab"
          label="신랑측에 연락하기"
        />
      </div>
      <>
        <ContactLinks show={showLinks == 'groom'} seconds={.5}>
          <ul>
            <li>
              <ContactButton
                bgColor="rgba(255, 232, 18, .5)"
                href={GROOM_KAKAO}
                target='_blank'>
                <img src="/images/kakaotalk-logo.svg" />
                카카오톡
              </ContactButton>
            </li>
            <li>
               <ContactButton
                bgColor="rgba(162, 218, 162, .5)"
                href={`tel:${GROOM_TEL}`}
                target='_blank'>
                <Phone fr={"groom_phone"}/>
                 전화
              </ContactButton>
            </li>
          </ul>
        </ContactLinks>
        <ContactLinks show={showLinks == 'bride'} seconds={.5}>
          <ul>
            <li>
              <ContactButton
                bgColor="rgba(255, 232, 18, .5)"
                href={BRIDE_KAKAO}
                target='_blank'>
                <img src="/images/kakaotalk-logo.svg" />
                카카오톡
              </ContactButton>
            </li>
            <li>
               <ContactButton
                bgColor="rgba(247, 200, 211, .5)"
                href={`tel:${BRIDE_TEL}`}
                target='_blank'>
                <Phone fr={"bride_phone"}/>
                 전화
              </ContactButton>
            </li>
          </ul>
        </ContactLinks>
      </>
      <div onClick={x => setShowLinks(showLinks == 'bride' ? '' : 'bride')}>
        <CallButton
          icon={<EmojiLookLeft fr='bride_emoji'/>}
          bgColor="#F7C8D3"
          label="신부측에 연락하기"
        />
      </div>
    </CallWrap>

    </>
  );
};