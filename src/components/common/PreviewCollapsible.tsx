import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";


const BlurCover = styled.div<{
  expanded: boolean,
  seconds?: number,
}>`
  width: 100%;
  height: 20%;
  min-height: 200px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.33) 20%, rgba(255,255,255,1) 100%);
  opacity: ${({ expanded }) => expanded ? 0 : 1};
  transition: ${({ seconds }) => `opacity ${seconds}s ease`};
`

const ChildContainer = styled.div<{
  expanded: boolean,
  minHeight: number,
  maxHeight: number,
  seconds?: number,
}>`
  position: relative;
  overflow: hidden;
  transition: ${({ seconds }) => `max-height ${seconds}s ease`};
  max-height: ${({ minHeight, maxHeight, expanded }) => `${expanded ? maxHeight : minHeight}px`};
`;


const ExpandButton = styled.button`
  border: none;
  background-color: transparent;
  color: lightblue;
  margin: 0 auto;
`

interface PreviewCollapsiblePropType{
  children: any;
  height?: number;
}

export function PreviewCollapsible({height = 500, children}: PreviewCollapsiblePropType) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const ref = useRef(null)

  return (
    <div>
      <ChildContainer
        expanded={expanded} seconds={0.3}
        maxHeight={ref?.current?.['clientHeight'] || 0}
        minHeight={height}>
        <BlurCover expanded={expanded} seconds={0.3}/>
        <div ref={ref}>
          {children}
        </div>
      </ChildContainer>
      <ExpandButton onClick={() => setExpanded(!expanded)}>{expanded ? '접기' : '더보기'}</ExpandButton>
    </div>
  );
}



