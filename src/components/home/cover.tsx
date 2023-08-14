import React, { useEffect, useState, CSSProperties } from "react";
// import Image from "next/image"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from "next-image-export-optimizer";
import styled, {css} from "styled-components";
// import styles bundle
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from 'swiper';
import { Slide } from "react-awesome-reveal";
import coverPic from "@/public/photos/cover.jpg";
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE, WEDDING_DATE_TZ } from "@/config";
import TimeCountDown from "@/components/home/countdown";
import { toDateString } from "@/common/utils";
import cover1 from "@/public/photos/cover/1.jpg";
import cover2 from "@/public/photos/cover/2.jpg";
import cover3 from "@/public/photos/cover/3.jpg";
import cover4 from "@/public/photos/cover/4.jpg";
import cover5 from "@/public/photos/cover/5.jpg";


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


const SlideInner = styled.div<{
  offsets?: number[]
  aspectRatio?: number
}>`
${({offsets, aspectRatio}) => offsets != null && aspectRatio != null
  ? css`
  img {
    /* >= 1.666, wide screen including 16:9 */
    @media screen and (min-aspect-ratio: 16000/9000) {
      position: absolute;
      top: -${offsets[0]}%;
    }
    /* [1.333 <= x < 1.666], wide */
    @media screen and (min-aspect-ratio: 12000/9000) and (max-aspect-ratio: 15999/9000) {
      position: absolute;
      top: -${offsets[1]}%;
    }
    /* [1.10 <= x < 1.333], near square */
    @media screen and (min-aspect-ratio: 11000/10000) and (max-aspect-ratio: 11999/9000) {
      position: absolute;
      top: -${offsets[2]}%;
    }
    /* [0.85 <= x < 1.10 ] */
    @media screen and (min-aspect-ratio: 8500/10000) and (max-aspect-ratio: 10999/10000) {
      position: absolute;
      top: -${offsets[3]}%;
    }
    /* [0.66 <= x < 0.85 ] */
    @media screen and (min-aspect-ratio: 6667/10000) and (max-aspect-ratio: 8499/10000) {
      position: absolute;
      top: -${offsets[4]}%;
    }
  }
  `
  : ''
  }
`


const SlideImage = (props: {src: any, offsets?: number[], aspectRatio?: number}) => {
  const {
    offsets,
    aspectRatio
  } = props
  let style: CSSProperties = {};
  if (offsets != null && aspectRatio != null) {
    let offset = 0;
    if (aspectRatio >= 16/9) {
      offset = offsets[0]
    } else if (aspectRatio >= 12/9) {
      offset = offsets[1]
    } else if (aspectRatio >= 11/10) {
      offset = offsets[2]
    } else if (aspectRatio >= 85/100) {
      offset = offsets[3]
    } else if (aspectRatio >= 2/3) {
      offset = offsets[4]
    }
    if (offset != 0) {
      style['position'] = 'absolute';
      style['top'] = `${offset}%`;
    }
  }
  console.log(style)

  return (
    <div className="my-slide-inner">
      <Image
          style={style}
        src={props.src} alt=""
        priority layout="responsive"
        />
    </div>
  );
}

const Cover = () => {
  const [parentAspectRatio, setParentAspectRatio] = useState(1); // 초기 가로세로 비율

  const updateAspectRatio = () => {
    const dom = document.getElementById('cover');
    if (dom != null) {
      const parentWidth = dom.offsetWidth;
      const parentHeight = dom.offsetHeight;
      const newAspectRatio = parentWidth / parentHeight;
      setParentAspectRatio(newAspectRatio);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateAspectRatio);
    updateAspectRatio(); // 초기화

    return () => {
      window.removeEventListener('resize', updateAspectRatio);
    };
  }, []);

  return (
    <>
      <section id="cover" className="cover-slider cover-slider-media">

        <div className="cover-text-wrapper">
          <div className="cover-text">
            <Slide direction="up" cascade>
              <h2>
                {`${GROOM_NAME} & ${BRIDE_NAME}`}
                {/*<Image src={coverPic} priority={true} placeholder="blur" alt="" />*/}
              </h2>
              <h3>{toDateString(WEDDING_DATE, "%Y. %m. %d (%a) %H:%M")}</h3>
              <div className="clock-grids">
                <TimeCountDown targetDate={WEDDING_DATE_TZ}/>
              </div>
            </Slide>
          </div>
        </div>

        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          speed={1}   // transition speed, 200: smooth, 1: instant
          // effect={"fade"}   // buggy
          // fadeEffect={{ crossFade: true }}
          parallax={true}
          pagination={{ clickable: true }}
          // navigation
        >
          <SwiperSlide data-desc="">
            <SlideImage src={cover1} offsets={[-1, -1, -1, -1, 0]} aspectRatio={parentAspectRatio}/>
          </SwiperSlide>
          <SwiperSlide data-desc="">
            <SlideImage src={cover2} offsets={[-30,-25,-10,-10,0]} aspectRatio={parentAspectRatio}/>
          </SwiperSlide>
          <SwiperSlide data-desc="">
            <SlideImage src={cover3} offsets={[-90,-70,-55,-25,0]} aspectRatio={parentAspectRatio}/>
          </SwiperSlide>
          <SwiperSlide data-desc="">
            <SlideImage src={cover4} offsets={[-100,-80,-60,-25,0]} aspectRatio={parentAspectRatio}/>
          </SwiperSlide>
          <SwiperSlide data-desc="">
            <SlideImage src={cover5} offsets={[-135,-100,-60,-25,0]} aspectRatio={parentAspectRatio}/>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  )
}

export default Cover
