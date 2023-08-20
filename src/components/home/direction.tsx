import React, { useEffect, useState, CSSProperties } from "react";
import Image from "next/image"
import {
  NAVER_API_CLIENT_ID,
  WEDDING_VANUE_ADDRESS,
  WEDDING_VANUE_DIRECTIONS,
  WEDDING_VANUE_KAKAO_LINK, WEDDING_VANUE_NAVER_LINK
} from "@/config";
import { Container as MapDiv, Marker, NaverMap, NavermapsProvider, useNavermaps } from 'react-naver-maps';
import { SectionHeader, TextSansStyle } from "@/components/home/styles";
import mapPic from "@/public/photos/map.png";
import styled from "styled-components";
import { PinAlt } from "iconoir-react";



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


const DirectionInner = () => {
  const navermaps = useNavermaps()
  const map = (
    // <MapWrapper>
    <div className='map-wrapper'>
      <div>
      <MapDiv style={{width: '100%', height: '100%'}}>
        <NaverMap
          defaultCenter={new navermaps.LatLng(37.448653424410544, 126.95093702548472)}
          defaultZoom={16}
        >
          <Marker
            defaultPosition={new navermaps.LatLng(37.448653424410544, 126.95093702548472)}
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

      {map}

      <MapButton href={WEDDING_VANUE_KAKAO_LINK} target='_blank'>
        <PinAlt fr='kakao_map' color="#1199EE" /> 카카오맵
      </MapButton>
      <MapButton href={WEDDING_VANUE_NAVER_LINK} target='_blank'>
        <PinAlt fr='naver_map' color="#66BB66" /> 네이버지도
      </MapButton>


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

      <br />
      <br />
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