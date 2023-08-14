import React from "react";
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
}>`
${({offsets}) => offsets != null
  ? css`
  div > img {
    top: -${offsets[5]}%;
    /* >= 1.666, wide screen including 16:9 */
    @media screen and (min-aspect-ratio: 16000/9000) {
      top: -${offsets[0]}%;
    }
    /* [1.333 <= x < 1.666], wide */
    @media screen and (min-aspect-ratio: 12000/9000) and (max-aspect-ratio: 15999/9000) {
      top: -${offsets[1]}%;
    }
    /* [1.10 <= x < 1.333], near square */
    @media screen and (min-aspect-ratio: 11000/10000) and (max-aspect-ratio: 11999/9000) {
      top: -${offsets[2]}%;
    }
    /* [0.85 <= x < 1.10 ] */
    @media screen and (min-aspect-ratio: 8500/10000) and (max-aspect-ratio: 10999/10000) {
      top: -${offsets[3]}%;
    }
    /* [0.66 <= x < 0.85 ] */
    @media screen and (min-aspect-ratio: 6667/10000) and (max-aspect-ratio: 8499/10000) {
      top: -${offsets[4]}%;
    }
    }
  `
  : ''
  }
`


const SlideImage = (props: {src: any, offsets?: number[]}) => {
  const img = props.src;
  return (
    <div className="swiper-slide">
      <SlideInner className="slide-inner slide-bg-image" offsets={props.offsets}>
        <div>
        <Image
          src={img} alt=""
          priority layout="responsive"
          />
        </div>
      </SlideInner>
    </div>
  );
}

const Cover = () => {
  return (
    <>
      <section className="cover-slider cover-slider-media">

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

        <div className="swiper-container">
          <div className="swiper-wrapper">
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
              speed={200}   // transition speed, 200: smooth, 1: instant
              // effect={"fade"}   // buggy
              // fadeEffect={{ crossFade: true }}
              parallax={true}
              pagination={{ clickable: true }}
              // navigation
            >
              <SwiperSlide data-desc="">
                <SlideImage src={cover1} />
              </SwiperSlide>
              <SwiperSlide data-desc="">
                <SlideImage src={cover2} offsets={[30,25,15,10,5, 0]} />
              </SwiperSlide>
              <SwiperSlide data-desc="">
                <SlideImage src={cover3} offsets={[90,75,45,45,30, 10]} />
              </SwiperSlide>
              <SwiperSlide data-desc="">
                <SlideImage src={cover4} offsets={[100,75,50,50,45, 10]} />
              </SwiperSlide>
              <SwiperSlide data-desc="">
                <SlideImage src={cover5} offsets={[135,100,70,75,50, 10]} />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cover