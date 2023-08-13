import React from "react";
// import Image from "next/image"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from "next-image-export-optimizer";
import styled from "styled-components";
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


const SlideImage = (props) => {
  const img = props.src;
  return (
    <div className="swiper-slide">
      <div className="slide-inner slide-bg-image">
        <Image
          src={img} alt=""
          priority layout="responsive"
          style={props.style} />
      </div>
    </div>
  );
}

const Cover = () => {
  return (
    <>
      <section className="wpo-hero-slider wpo-hero-style-2">

        <div className="wedding-announcement">
          <div className="couple-text">
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
                <SlideImage src={cover1} style={{}} />
              </SwiperSlide>
              <SwiperSlide data-desc="">
                <SlideImage src={cover2} style={{}} />
              </SwiperSlide>
              <SwiperSlide data-desc="">
                <SlideImage src={cover3} style={{}} />
              </SwiperSlide>
              <SwiperSlide data-desc="">
                <SlideImage src={cover4} style={{}} />
              </SwiperSlide>
              <SwiperSlide data-desc="">
                <SlideImage src={cover5} style={{}} />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cover