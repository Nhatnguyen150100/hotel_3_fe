import React from "react";
import { IRoom } from "../../types/room.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ImageHover from "./ImageHover";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function CustomSwiper({ room }: { room: IRoom }) {
  const sliderRef = React.useRef<any>(null);

  const handlePrev = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        ref={sliderRef}
        navigation={false}
        modules={[Pagination]}
        className="mySwiper"
      >
        {room.img_1 && (
          <SwiperSlide>
            <ImageHover className="rounded-xl" src={room.img_1} alt="img" />
          </SwiperSlide>
        )}
        {room.img_2 && (
          <SwiperSlide>
            <ImageHover className="rounded-xl" src={room.img_2} alt="img" />
          </SwiperSlide>
        )}
        {room.img_3 && (
          <SwiperSlide>
            <ImageHover className="rounded-xl" src={room.img_3} alt="img" />
          </SwiperSlide>
        )}
        {room.img_4 && (
          <SwiperSlide>
            <ImageHover className="rounded-xl" src={room.img_4} alt="img" />
          </SwiperSlide>
        )}
        {room.img_5 && (
          <SwiperSlide>
            <ImageHover className="rounded-xl" src={room.img_5} alt="img" />
          </SwiperSlide>
        )}
        {room.img_6 && (
          <SwiperSlide>
            <ImageHover className="rounded-xl" src={room.img_6} alt="img" />
          </SwiperSlide>
        )}
      </Swiper>
      <div className="relative">
        <div
          className="absolute top-[-110px] z-50 rounded-full h-[32px] w-[32px] bg-white p-1 flex justify-center items-center hover:cursor-pointer transform-hover"
          onClick={handlePrev}
        >
          <LeftOutlined className="hover:text-yellow-600" />
        </div>
        <div
          className="absolute top-[-110px] right-0 z-50 rounded-full h-[32px] w-[32px] bg-white p-1 flex justify-center items-center hover:cursor-pointer transform-hover"
          onClick={handleNext}
        >
          <RightOutlined className="hover:text-yellow-600" />
        </div>
      </div>
    </>
  );
}
