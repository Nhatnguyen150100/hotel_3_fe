import { Carousel, Empty, Spin } from "antd";
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
    url: "/landing_page/landing_page_4.jpg",
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
    <div className="flex flex-col w-full justify-start items-center">
      <div className="w-full min-h-[540px]">
        <Carousel autoplay>
          {(listImages.length ? listImages : DEFINE_IMG_CAROUSEL).map(
            (item) => (
              <img
                key={item.id}
                className="w-full h-[580px] object-cover"
                src={item.url}
              />
            )
          )}
        </Carousel>
      </div>
      <div className="container space-y-24 my-10 flex flex-col w-full justify-start items-center relative bg-transparent">
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
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-5 px-4 sm:px-24 pt-[240px] sm:pt-0">
          {DEFINE_ICON_SLOGAN.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-start items-start space-x-5 transform-hover hover:text-yellow-600 hover:cursor-pointer"
            >
              <img className="w-12 h-12" src={item.icon} />
              <p className="sm:text-lg text-base font-medium max-w-[170px] text-center">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <ListRoomLandingPage />
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
            className="hover:text-white hover:bg-yellow-600 text-yellow-600 font-light text-lg flex justify-center items-center border border-solid rounded-3xl border-yellow-600 px-3 py-2 min-w-[220px]"
          >
            Xem thêm
          </button>
        </div>
        <ListNews />
      </div>
    </div>
  );
}
