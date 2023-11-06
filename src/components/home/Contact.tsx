import { Phone, Message } from "iconoir-react";
import styled, { css, keyframes } from "styled-components";
import { TextSansStyle } from "@/components/home/styles";
import {
  BRIDE_DAD_TEL,
  BRIDE_KAKAO, BRIDE_MOM_TEL,
  BRIDE_TEL,
  GROOM_KAKAO,
  GROOM_MOM_TEL,
  GROOM_TEL
} from "@/config";
import { useState } from "react";
import Modal from "@/components/common/Modal";
import { Header, Wrap } from "@/components/home/talk/styles";


const CallWrap = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  margin: 40px 0;
`;

const CallButtonWrap = styled.div<{ bgColor: string }>`
  ${TextSansStyle}
  font-size: 13px;
  // background-color: ${({ bgColor }) => bgColor};
  border-radius: 15px;
  margin: 0 10px;
  div {
    position: absolute;
    border: solid ${({ bgColor }) => bgColor};
    margin-top: 10px;
    margin-left: 10px;
    width: 130px;
    height: 130px;
    border-radius: 130px;
    opacity: 0.5;
  }
  img {
    display: block;
    margin: 0 auto;
    margin-bottom: 4px;
    width: 150px;
    height: 150px;
    padding: 5px;
    border-radius: 150px;
    // background-color: ${({ bgColor }) => bgColor};
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
      <div>
      </div>
      {icon}
      {label}
    </CallButtonWrap>
  </>
);


const ContactButton = styled.a<{ bgColor: string}>`
  margin-right: 10px;
  > img {
    width: 18px;
    height: 18px;
    border-radius: 9px;
    margin: -4px 0;
    margin-right: 5px;
  }
  > svg {
    stroke-width: 2.2;
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


const ContactTable = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;

  .row {
    display: table-row;
  }
  .cell {
    display: table-cell;
    text-align: center;
  }
  .label {
    width: 80px;
    justify-content: right;
  }
  .contacts {
    display: flex;
    flex-wrap: nowrap;
    justify-content: right;
    align-items: center;
    margin-right: 10px;
  }
`


type ContactCardProps = {
  label: string;
  name: string;
  kakao?: string;
  phone: string;
};

const ContactCard = ({label, name, kakao, phone}: ContactCardProps) => {
  return (
    <div className={"row"}>
      <div className={"cell label"}>{label}</div>
      <div className={"cell name"}>{name}</div>
      <div className={"cell contacts"}>
        {kakao && <ContactButton
          // bgColor="rgba(255, 232, 18, .5)"
          bgColor="rgba(247, 200, 211, .5)"
          href={kakao}
          target='_blank'>
          <img src="/images/kakao.svg" />
        </ContactButton>}
        {phone && <ContactButton
          bgColor="rgba(247, 200, 211, .5)"
          href={`sms:${phone}`}
          target='_blank'>
          <Message />
        </ContactButton>}
        {phone && <ContactButton
          bgColor="rgba(247, 200, 211, .5)"
          href={`tel:${phone}`}
          target='_blank'>
          <Phone />
        </ContactButton>}
      </div>
    </div>
  )
}

const BrideContact = () => {
  return <Wrap>
      <Header>
        👰🏻‍<span>신부측 연락처</span>
      </Header>
      <ContactTable>
        <ContactCard label={"신부"} name={"어희재"} kakao={BRIDE_KAKAO} phone={BRIDE_TEL}/>
        <ContactCard label={"부"} name={"어하준"} phone={BRIDE_DAD_TEL}/>
        <ContactCard label={"모"} name={"임경원"} phone={BRIDE_MOM_TEL}/>
      </ContactTable>
    </Wrap>
}

const GroomContact = () => {
  return <Wrap>
      <Header>
        🤵🏻<span>신랑측 연락처</span>
      </Header>
      <ContactTable>
        <ContactCard label={"신랑"} name={"오성민"} kakao={GROOM_KAKAO} phone={GROOM_TEL}/>
        <ContactCard label={"모"} name={"성지영"} phone={GROOM_MOM_TEL}/>
      </ContactTable>
    </Wrap>
}

export const Contact = () => {
  const [showLinks, setShowLinks] = useState('');

  return (
    <>
    <CallWrap>
      <div onClick={x => setShowLinks(showLinks == 'groom' ? '' : 'groom')}>
        <CallButton
          icon={<img src='/photos/profile/groom.jpg'/>}
          bgColor="#FFF6F6"
          label="신랑측에 연락하기"
        />
      </div>
      <div onClick={x => setShowLinks(showLinks == 'bride' ? '' : 'bride')}>
        <CallButton
          icon={<img src='/photos/profile/bride.jpg'/>}
          bgColor="#FFF6F6"
          label="신부측에 연락하기"
        />
      </div>
      {
        showLinks == 'bride' &&
        <Modal handleClose={() => setShowLinks('')}>
          <BrideContact/>
        </Modal>
      }
      {
        showLinks == 'groom' &&
        <Modal handleClose={() => setShowLinks('')}>
          <GroomContact/>
        </Modal>
      }
    </CallWrap>

    </>
  );
};