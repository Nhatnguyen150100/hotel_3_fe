import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import roomService from "../../services/roomService";
import { IFacilitiesRooms, IRoom } from "../../types/room.types";
import Visibility from "../../components/base/visibility";
import { Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ImageHover from "../../components/base/ImageHover";
import { formatCurrency } from "../../utils/format-money";
import { DEFINE_ROUTE } from "../../constants/route-mapper";
import buildUrlWithParams from "../../utils/build-url-with-param";

export default function RoomDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = React.useState<IRoom>();

  const handleGetRoom = async () => {
    const rs = await roomService.getRoom(id!);
    setRoom(rs.data);
  };

  React.useEffect(() => {
    if (id) handleGetRoom();
  }, [id]);

  return (
    <div className="flex flex-col justify-start items-start py-10">
      <div className="flex flex-row">
        {room && (
          <div className="container bg-transparent flex flex-col items-start justify-start space-y-10">
            <div className="container bg-transparent sm:max-h-[560px] w-[320px] sm:w-auto">
              <Swiper
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  dynamicBullets: true,
                }}
                loop={true}
                navigation={false}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
              >
                {room.img_1 && (
                  <SwiperSlide>
                    <ImageHover
                      className="rounded-xl"
                      src={room.img_1}
                      alt="img"
                    />
                  </SwiperSlide>
                )}
                {room.img_2 && (
                  <SwiperSlide>
                    <ImageHover
                      className="rounded-xl"
                      src={room.img_2}
                      alt="img"
                    />
                  </SwiperSlide>
                )}
                {room.img_3 && (
                  <SwiperSlide>
                    <ImageHover
                      className="rounded-xl"
                      src={room.img_3}
                      alt="img"
                    />
                  </SwiperSlide>
                )}
                {room.img_4 && (
                  <SwiperSlide>
                    <ImageHover
                      className="rounded-xl"
                      src={room.img_4}
                      alt="img"
                    />
                  </SwiperSlide>
                )}
                {room.img_5 && (
                  <SwiperSlide>
                    <ImageHover
                      className="rounded-xl"
                      src={room.img_5}
                      alt="img"
                    />
                  </SwiperSlide>
                )}
                {room.img_6 && (
                  <SwiperSlide>
                    <ImageHover
                      className="rounded-xl"
                      src={room.img_6}
                      alt="img"
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
            <div className="flex flex-row justify-start items-start space-x-5 w-full">
              <div className="flex flex-col justify-start items-start w-full space-y-4">
                <h1 className="sm:text-5xl text-3xl font-semibold w-full text-center">
                  {room.name}
                </h1>
                <div className="flex flex-row items-end space-x-2">
                  <img
                    className="h-6 w-6"
                    src="/icon-facilities/single-bed.png"
                  />
                  <span className="first-letter:capitalize sm:text-base text-sm">
                    {room?.bedType}
                  </span>
                </div>
                <div className="flex flex-row items-end space-x-2">
                  <img className="h-6 w-6" src="/icon-facilities/area.png" />
                  <span className="first-letter:capitalize sm:text-base text-sm">
                    {room?.acreage} m<sup>2</sup>
                  </span>
                </div>
                <p className="sm:text-base text-sm">{room?.description}</p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full space-y-10">
              <span className="sm:text-2xl text-xl font-bold mb-3 text-red-700">
                Các tiện ích có trong phòng
              </span>
              <div className="grid grid-cols-2 gap-y-8 w-full">
                <Visibility visibility={Boolean(room?.facilitiesRooms?.length)}>
                  {room?.facilitiesRooms?.map((facility: IFacilitiesRooms) => (
                    <div
                      key={facility.id}
                      className="flex items-center space-x-2"
                    >
                      <img
                        className="h-6 w-6"
                        src={`/icon-facilities/${facility.facility.icon}.png`}
                      />
                      <span className="sm:text-base text-sm">
                        {facility.facility.name}
                      </span>
                    </div>
                  ))}
                </Visibility>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full space-y-10">
              <span className="sm:text-2xl text-xl font-bold mb-3 text-red-700">
                Giá phòng các ngày
              </span>
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-y-3 w-full">
                <div className="flex flex-col justify-start items-center w-full space-y-3 border-[2px] border-dashed border-gray-300 py-5">
                  <h1 className="sm:text-xl text-lg font-semibold">
                    Giá phòng ngày thường
                  </h1>
                  <span className="font-semibold text-yellow-600 sm:text-3xl text-xl">
                    {room.normalDayPrice
                      ? formatCurrency(room.normalDayPrice)
                      : "Liên hệ trực tiếp"}
                  </span>
                </div>
                <div className="flex flex-col justify-start items-center w-full space-y-3 border-[2px] border-dashed border-gray-300 py-5">
                  <h1 className="sm:text-xl text-lg font-semibold">
                    Giá phòng cuối tuần
                  </h1>
                  <span className="font-semibold text-yellow-600 sm:text-3xl text-xl">
                    {room.weekendPrice
                      ? formatCurrency(room.weekendPrice)
                      : "Liên hệ trực tiếp"}
                  </span>
                </div>
                <div className="flex flex-col justify-start items-center w-full space-y-3 border-[2px] border-dashed border-gray-300 py-5">
                  <h1 className="sm:text-xl text-lg font-semibold">
                    Giá phòng ngày lễ
                  </h1>
                  <span className="font-semibold text-yellow-600 sm:text-3xl text-xl">
                    {room.holidayPrice
                      ? formatCurrency(room.holidayPrice)
                      : "Liên hệ trực tiếp"}
                  </span>
                </div>
              </div>
            </div>
            <Button
              className="h-[65px] w-full bg-yellow-600 rounded-2xl hover:!bg-yellow-500 sm:text-xl text-base"
              type="primary"
              variant="filled"
              onClick={() => {
                navigate(
                  buildUrlWithParams(DEFINE_ROUTE.bookingPage, {
                    roomId: room.id,
                    startDate: null,
                    endDate: null,
                  })
                );
              }}
            >
              Đặt phòng ngay
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
