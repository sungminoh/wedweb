import styled from "styled-components";
import { Check, Copy } from "iconoir-react";
import { useEffect, useState } from "react";
import { useIsBride } from "@/utils";

const GiveWrap = styled.div`
  display: inline-block;
  // text-align: left;
  line-height: 2;
`;


const AccountDiv = styled.div`
  max-width: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  .owner {
    width: 80px;
    text-align: right;
  }
  a {
    height: 20px;
  }
  .bank {
    width: 80px;
  }
  .account {
    width: 130px;
    text-align: right;
  }
  
  @media screen and (max-width: 350px) {
    letter-spacing: -1px;
    font-size: 12px;
    .owner {
      width: 60px;
    }
    a {
      height: 16px;
    }
    .bank {
      width: 60px;
    }
    .account {
      width: 80px;
    }
  }
`

interface AccountPropType {
  owner: string;
  bank: string;
  account: string;
}
const Account = ({owner, bank, account}: AccountPropType) => {
  const [isCopied, setIsCopied] = useState(false);
  const copytext = account;

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(copytext)
      .catch(() => {
        document.execCommand("copy", true, copytext);
      })
      .then(() => {
        setIsCopied(true);
        setTimeout(() => { setIsCopied(false); }, 1000);
      });
    ;
  };
  return (
    <AccountDiv>
      <span className="owner">
        {owner}:
      </span>
      <span className="bank">
        {bank}
      </span>
      <span className="account">
        {account}
      </span>
      <a onClick={handleCopyText} aria-label='Copy to Clipboard' className={isCopied ? "copied" : ""}>
        {!isCopied
          ? <Copy className='copy' style={{ color: 'grey' }}/>
          : <Check className='check' style={{ color: "#37b24d" }} />
        }
      </a>
    </AccountDiv>
  );
};


const CollapsibleContainer = styled.div<{
  show: boolean,
  seconds: number,
  height: string;
}>`
  overflow: hidden;
  height: ${({ height, show }) => (show? `${height}` : '0')};
  opacity: ${({ show }) => (show? '1' : '0')};
  transition: height ${({seconds}) => `${seconds}s ease`}, opacity ${({seconds}) => `${seconds}s ease`};
`


interface CollasiblePropType {
  title: string;
  children: any;
}
const Collapsible = ({title, children}: CollasiblePropType) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => { setOpen(!open); };

  return (
    <div>
      <h6 onClick={toggleOpen}>{title}</h6>
      <CollapsibleContainer show={open} seconds={.3} height={'90px'}>
        <div className="content">
          {children}
        </div>
      </CollapsibleContainer>
    </div>
);
};


const Groom = () => {
  return (
    <Collapsible title="🤵 신랑측">
      <Account owner="오성민" bank="신한은행" account="110-284-329679" />
      <Account owner="모 성지영" bank="농협" account="211031-56-212946" />
    </Collapsible>
  );
};

const Bride = () => {
  return (
    <Collapsible title="👰 신부측">
      <Account owner="어희재" bank="신한은행" account ="110-247-285527" />
      <Account owner="부 어하준" bank="신한은행" account ="110-247-285527" />
      <Account owner="모 임경원" bank="하나은행" account ="143-910405-15607" />
    </Collapsible>
  );
};

const GroomSimple = () => {
  return (
    <Collapsible title="🤵 신랑측">
      <Account owner="오성민" bank="신한은행" account="110-284-329679" />
    </Collapsible>
  );
};

const BrideSimple = () => {
  return (
    <Collapsible title="👰 신부측">
      <Account owner="어희재" bank="신한은행" account ="110-247-285527" />
    </Collapsible>
  );
};


export const Gift  = () => {
  const isBride = useIsBride();

  return (
    <>
      <section>
        {isBride
          ? (
            <GiveWrap>
              <GroomSimple />
              <BrideSimple />
            </GiveWrap>
          ) : (
            <GiveWrap>
              <Groom />
              <Bride />
            </GiveWrap>
          )
        }
      </section>
    </>
  );
}

export default Gift