import React, { useEffect, useState, CSSProperties } from "react";
import Image from "next/image"
import {
  NAVER_API_CLIENT_ID,
  WEDDING_VANUE_ADDRESS,
  WEDDING_VANUE_KAKAO_LINK, WEDDING_VANUE_NAVER_LINK
} from "@/config";
import { Container as MapDiv, Marker, NaverMap, NavermapsProvider, useNavermaps } from 'react-naver-maps';
import { SectionHeader, SectionHeaderA, TextSansStyle } from "@/components/home/styles";
import mapPic from "@/public/photos/map.png";
import styled from "styled-components";
import { PinAlt, Position } from "iconoir-react";
import {
  Icon3Square,
  Icon4Square,
  IconBoomGateUpOutline, IconBxBus,
  IconLocation,
  IconSignTurnLeft,
  IconSignTurnSlightRight, IconSubway
} from "@/components/icons";



const DirectionSection = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 20px;
  text-align: left;
`;

const DirectionWrapper = styled.div`
  width: 380px;
  max-width: 400px;
  margin: 0 10px 0 10px;
  div:not(:last-child) {
    margin-bottom: 20px;
  }
  
`

const DirectionSteps = styled.div`
  span {
    margin-right: 10px
  }
  h3 {
    margin-bottom: 10px;
  }
  @media screen and (max-width: 350px) {
    letter-spacing: -1px;
    font-size: 12px;
  }
  ul {
    li {
      span {
        height: 14px;
      }
      margin: 0 0 10px 0;
      font-size: 14px;
      line-height: 1.3;
      display: flex;
      align-items: center;
      @media screen and (max-width: 350px) {
        letter-spacing: -1px;
        font-size: 12px;
        span {
          height: 12px;
        }
      }
    }
  }
`;

export const HSpace = styled.hr<{
  height?: number
}>`
  width: 100%;
  margin: ${({height}) => `${height}px 0 0 0`};
  border: 0;
  // border-top: 1px solid #ccc;
`;

const DirectionFooter = styled.p`
  font-size: 10px;
  // font-weight: bold;
  line-height: 1.5;
`;

const DummyDirectionFooter = styled.p`
  font-size: 10px;
  // font-weight: bold;
  line-height: 1.5;
  @media screen and (max-width: 839px) {
    display: none;
  }
`;


const DirectionHeader = styled.h3`
  font-family: "HallymGothic-Regular";
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
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


const NaverMapButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba();
  color: black;
  border-radius: 20px;
  width: 80px;
  height: 35px;
  border: none;
  top: 0;
  right: 0;
  margin: 10px;
  zIndex: 1000;
`;

const Venue = styled.div`
  white-space: pre-line;
  margin-bottom: 20px;
  line-height: 25px;
  span {
    font-weight: bold;
    font-size: 20px;
  }
`


const DirectionInner = () => {
  const navermaps = useNavermaps()
  const venueLatLng = new navermaps.LatLng(37.448653424410544, 126.95093702548472)
  const [map, setMap] = useState(null);
  const mapDom = (
    // <MapWrapper>
    <div className='map-wrapper'>
      <div className='map-container'>
        <MapDiv style={{width: '100%', height: '100%'}}>
          <NaverMap
            defaultCenter={venueLatLng }
            defaultZoom={16}
            ref={setMap}
          >
            <NaverMapButton
              onClick={(e) => {
                e.preventDefault()
                if (map) {
                  // @ts-ignore: Type error
                  map.setCenter(venueLatLng)
                  // @ts-ignore: Type error
                  map.setZoom(16, true)
                }
              }}
            >
              <Position/> 원위치
            </NaverMapButton>
            <Marker
              defaultPosition={venueLatLng}
            />
          </NaverMap>
        </MapDiv>
      </div>
    </div>
    // </MapWrapper>
  )

  return (
    <>
      <SectionHeader>오시는 길</SectionHeader>

      <Venue>
        <span>{WEDDING_VANUE_ADDRESS}</span>
      </Venue>

      {mapDom}

      <MapButton href={WEDDING_VANUE_KAKAO_LINK} target='_blank'>
        <PinAlt fr='kakao_map' color="#1199EE" /> 카카오맵
      </MapButton>
      <MapButton href={WEDDING_VANUE_NAVER_LINK} target='_blank'>
        <PinAlt fr='naver_map' color="#66BB66" /> 네이버지도
      </MapButton>


      <DirectionSection>
        <DirectionWrapper key={1}>
          <DirectionHeader>{'자가용 이용시'}</DirectionHeader>
          <DirectionFooter>{'※ 주차는 예식장 앞 마당에 충분한 공간이 있으며 4시간 무료주차 제공됩니다.'}</DirectionFooter>
          <DirectionSteps>
            <h4>{'남부순환로에서 낙성대 방면으로 진입'}</h4>
            <ul>
              <li>
                <span><IconBoomGateUpOutline style={{color: 'grey'}}/></span>
                {'서울대 후문 진입'}
              </li>
              <li>
                <span><IconSignTurnLeft style={{color: 'grey'}}/></span>
                {'기숙사 삼거리에서 좌회전'}
              </li>
              <li>
                <span><IconLocation style={{color: 'grey'}}/></span>
                {'계속 직진하여 엔지니어 하우스(우측) 진입'}
              </li>
            </ul>
          </DirectionSteps>
          <DirectionSteps>
            <h4>{'남부순환로나 신림동 방면에서 진입'}</h4>
            <ul>
              <li>
                <span><IconBoomGateUpOutline style={{color: 'grey'}}/></span>
                {'서울대 정문 진입'}
              </li>
              <li>
                <span><IconSignTurnLeft style={{color: 'grey'}}/></span>
                {'경영대 방면으로 좌회전'}
              </li>
              <li>
                <span><IconSignTurnSlightRight style={{color: 'grey'}}/></span>
                {'기숙사 삼거리에서 직진'}
              </li>
              <li>
                <span><IconLocation style={{color: 'grey'}}/></span>
                {'계속 직진하여 언덕을 돌아 엔지니어 하우스(좌측) 진입'}
              </li>
            </ul>
          </DirectionSteps>
        </DirectionWrapper>


        <DirectionWrapper key={2}>
          <DirectionHeader>{'지하철 이용시'}</DirectionHeader>
          <DummyDirectionFooter>&nbsp;</DummyDirectionFooter>
          <DirectionSteps>
            <h4>
              {'2호선 낙성대역'}
             </h4>
            <ul>
              <li>
                <span><Icon4Square style={{color: 'green'}}/></span>
                {'4번출구로 나와 GS주유소 끼고 좌회전'}
              </li>
              <li>
                <span><IconBxBus style={{color: 'green'}}/></span>
                {'제과점 앞에서 마을버스 2번 탑승'}
              </li>
              <li>
                <span><IconLocation style={{color: 'grey'}}/></span>
                {'제2공학관(종점) 하차'}
              </li>
            </ul>
          </DirectionSteps>
          <DirectionSteps>
            <h4>
              {'2호선 서울대입구역'}
            </h4>
            <ul>
              <li>
                <span><Icon3Square style={{color: 'green'}}/></span>
                {'3번출구로 나와 20m 직진'}
              </li>
              <li>
                <span><IconBxBus style={{color: 'green'}}/></span>
                {'5511, 5513 버스 탑승'}
              </li>
              <li>
                <span><IconLocation style={{color: 'grey'}}/></span>
                {'제2공학관(종점) 하차'}
              </li>
            </ul>
            </DirectionSteps>
        </DirectionWrapper>
      </DirectionSection>
    </>
  )
}

const Direction = () => {
  return (
    <NavermapsProvider ncpClientId={NAVER_API_CLIENT_ID} >
      <DirectionInner/>
    </NavermapsProvider>
  );
}

export default Direction;