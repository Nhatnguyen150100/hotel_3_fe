import { Carousel, Divider, Empty, Spin } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";
import ImageHover from "../../components/base/ImageHover";
import ListRoomLandingPage from "./ListRoomLandingPage";
import SearchRoom from "./SearchRoom";
import ListNews from "./ListNews";
import { Link, useNavigate } from "react-router-dom";
import buildUrlWithParams from "../../utils/build-url-with-param";
import { DEFINE_ROUTE } from "../../constants/route-mapper";
import * as React from "react";
import { IBanner } from "../../types/banner.types";
import bannerService from "../../services/bannerService";
import { INew } from "../../types/new.types";
import destinationService from "../../services/destinationService";
import Visibility from "../../components/base/visibility";
import ListService from "./ListService";

const DEFINE_ICON_SLOGAN = [
  {
    icon: "/landing_page/icon_slogan_1.svg",
    text: "Đảm bảo giá tốt nhất",
  },
  {
    icon: "/landing_page/icon_slogan_2.svg",
    text: "Hỗ trợ di chuyển thuận tiện ở cả thành phố và sầm sơn",
  },
  {
    icon: "/landing_page/icon_slogan_3.svg",
    text: "Phục vụ tour và hội nghị, đám cưới chuyên nghiệp",
  },
  {
    icon: "/landing_page/icon_slogan_4.svg",
    text: "Hỗ trợ khách hàng nhanh nhất",
  },
];

const DEFINE_IMG_CAROUSEL = [
  {
    id: 1,
    url: "/landing_page/landing_page_1.jpg",
  },
  {
    id: 2,
    url: "/landing_page/landing_page_2.jpg",
  },
  {
    id: 3,
    url: "/landing_page/landing_page_3.jpg",
  },
  {
    id: 4,
    url: "/landing_page/landing_page_4.png",
  },
  {
    id: 5,
    url: "/landing_page/landing_page_5.png",
  },
  {
    id: 6,
    url: "/landing_page/landing_page_6.jpg",
  },
  {
    id: 7,
    url: "/landing_page/landing_page_7.png",
  },
];

export default function TheLandingPage() {
  const navigate = useNavigate();
  const [listImages, setListImages] = React.useState<IBanner[]>([]);
  const [listDestinations, setListDestinations] = React.useState<INew[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetListDestination = async () => {
    try {
      setLoading(true);
      const rs = await destinationService.getAllNew();
      setListDestinations(rs.data.content);
    } finally {
      setLoading(false);
    }
  };

  const handleGetListImages = async () => {
    try {
      setLoading(true);
      const rs = await bannerService.getAllImagesBanner();
      setListImages(rs.data.content);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleGetListImages();
    handleGetListDestination();
  }, []);

  return (
    <div className="flex flex-col w-full justify-start items-center bg-[#f8f8f8]">
      <div className="w-full min-h-[540px] relative">
        <div className="wrapper_slide h-[320px] sm:block hidden">
          <div className="container flex flex-row justify-between items-center space-x-5">
            <img className="h-20" src="/logo.png" alt="logo" />
            <div className="flex flex-col justify-start items-start space-y-5">
              <h3 className="text-white text-2xl font-semibold">
                Khách sạn Phượng Hoàng 3 Sầm Sơn - Nơi bạn trải nghiệm cuộc sống
              </h3>
              <Divider className="w-20 bg-white" />
              <p className="text-white text-base font-light">
                Khách sạn Phượng Hoàng 3 chào đón quý khách đến với không gian
                yên tĩnh của sự hiếu khách thuần Việt và dịch vụ tiêu chuẩn quốc
                tế. Với 140 phòng khách sang trọng, hệ thống phòng họp và nhà
                hàng chuyên nghiệp, dịch vụ khách sạn hoàn hảo, Phượng Hoàng
                Hotel đang là sự lựa chọn của tất cả du khách dừng chân tại
                Thanh Hóa.
              </p>
              <Link
                className="text-white underline font-semibold"
                to={DEFINE_ROUTE.introduce}
              >
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
        <Carousel autoplay>
          {(listImages.length ? listImages : DEFINE_IMG_CAROUSEL).map(
            (item) => (
              <img
                key={item.id}
                className="w-full h-[680px] object-cover"
                src={item.url}
              />
            )
          )}
        </Carousel>
      </div>
      <div className="container space-y-24 my-10 flex flex-col w-full justify-start items-center relative bg-transparent z-10">
        <div className="absolute sm:top-[-100px] top-[-200px]">
          <SearchRoom
            handleSearch={(startDate, endDate) => {
              navigate(
                buildUrlWithParams(DEFINE_ROUTE.listRoom, {
                  startDate,
                  endDate,
                })
              );
            }}
          />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-5 px-4 sm:px-24 pt-[80px] sm:pt-0">
          {DEFINE_ICON_SLOGAN.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-start items-start space-x-5 transform-hover hover:text-blue-600 hover:cursor-pointer"
            >
              <div className="w-22 h-22 flex justify-center items-center bg-blue-500 p-3 rounded-full">
                <img className="w-12 h-12 rotate-around" src={item.icon} />
              </div>
              <p className="sm:text-lg text-base font-medium max-w-[170px] text-center">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <ListRoomLandingPage />
        <ListService />
        <div className="flex flex-col justify-start items-center w-full space-y-10">
          <img
            width="200"
            height="60"
            src="./icontieude.png"
            alt="Icon tiêu đề"
          />
          <span className="uppercase text-[32px] sm:text-[40px] font-normal">
            <strong className="me-2">khoảnh khắc</strong>
            đáng nhớ
          </span>
          <div className="min-h-[120px] w-full">
            <Visibility
              visibility={listDestinations}
              suspenseComponent={loading ? <Spin /> : <Empty />}
            >
              <Swiper
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                }}
                style={{ paddingBottom: "50px" }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
              >
                {listDestinations?.map((_item) => (
                  <SwiperSlide key={_item.id}>
                    <div className="h-[360px]">
                      <Link
                        to={DEFINE_ROUTE.destinationDetail.replace(
                          ":id",
                          _item.id
                        )}
                      >
                        <ImageHover src={_item.thumbnailImg} />
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Visibility>
          </div>
          <button
            onClick={() => {
              navigate(DEFINE_ROUTE.listDestinations);
            }}
            className="hover:text-white hover:bg-blue-600 text-blue-600 font-light text-lg flex justify-center items-center border border-solid rounded-3xl border-blue-600 px-3 py-2 min-w-[220px]"
          >
            Xem thêm
          </button>
        </div>
        <ListNews />
      </div>
    </div>
  );
}
