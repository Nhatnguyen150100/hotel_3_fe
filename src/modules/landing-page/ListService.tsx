import { Link } from "react-router-dom";
import ImageHover from "../../components/base/ImageHover";
import { DEFINE_ROUTE } from "../../constants/route-mapper";
import displayDescription from "../../utils/displayDescription";

const DEFINE_SERVICE = [
  {
    id: 1,
    name: "Tiệc",
    img: "/landing_page/service/party/party.jpg",
    description:
      "Tiệc tại khách sạn Phượng Hoàng 3 Được tổ chức bởi đội ngũ chuyên nghiệp sẽ mang đến một buổi tiệc mà quý khách hằng mơ ước – phong cách và đáng nhớ. Quý khách chỉ việc chọn một trong những gói dịch vụ tiệc và chúng tôi sẽ thực hiện những công việc còn lại. Từ đó, quý khách có thể thoải mái tận hưởng bữa tiệc cưới, tiệc sinh nhật, tiệc liên hoan cuối năm,...hoàn hảo.",
    url: DEFINE_ROUTE.partyService,
  },
  {
    id: 2,
    name: "Hội nghị",
    img: "/landing_page/service/conference/conference.jpg",
    description:
      "Vị trí ngay trung tâm TP. Thanh Hóa - Đẳng cấp tiêu chuẩn Khách sạn. Một địa điểm đẳng cấp khẳng định giá trị thương hiệu cùng khách hàng. Khách sạn Phượng Hoàng 3 cung cấp cho Qúy khách sự lựa chọn đa dạng với các gói tổ chức hội nghị phong phú, sức chứa đến 600 người với view trung tâm thành phố. Hãy gây ấn tượng với những quan khách, đối tác bằng một buổi tiệc, sự kiện được tổ chức nghiêm túc và chuyên nghiệp. Đội ngũ nhân viên hỗ trợ Qúy khách hàng lên kế hoạch và thực hiện các hội nghị, họp báo, sự kiện ra mắt,... một cách tỉ mỉ đến từng chi tiết để đảm bảo thành công của sự kiện. ",
    url: DEFINE_ROUTE.conferenceService,
  },
  {
    id: 3,
    name: "Karaoke",
    img: "/landing_page/service/karaoke/karaoke.png",
    description:
      "Phòng hát Karaoke tại Khách sạn Phượng Hoàng 3 được bố trí những phòng tốt nhất Gồm các loại phòng hát lớn, mỗi phòng có sức chứa trên 10 người. Ngoài ra, các phòng Karaoke được bài trí sang trọng mà không kém phần lãng mạn của hệ thống đèn màu và âm thanh hiện đại, phòng Karaoke tại khách sạn sẽ đem đến không khí tươi vui và thăng hoa cùng âm nhạc cho Qúy khách.",
    url: DEFINE_ROUTE.karaokeService,
  },
  {
    id: 4,
    name: "Khu vui chơi",
    img: "/landing_page/service/playground/playground.jpg",
    description:
      "Với không gian vui chơi tại khách sạn Phượng Hoàng 3 sẽ mang đến cho các bé nơi lý tưởng để thỏa sức giải trí cùng gia đình. Khu vui chơi với trang thiết bị hiện đại trong không gian riêng tư, cùng các trò chơi và hoạt động sáng tạo hứa hẹn sẽ mang đến cho các bé khoảnh khắc ý nghĩa và kỳ nghỉ của gia đình thêm phần thú vị và thư thái hơn.",
    url: DEFINE_ROUTE.playground,
  },
];

export default function ListService() {
  return (
    <div className="flex flex-col justify-start items-center w-full space-y-10">
      <img width="200" height="60" src="./icontieude.png" alt="Icon tiêu đề" />
      <span className="uppercase text-[32px] sm:text-[40px] font-normal">
        <strong className="me-2">Dịch vụ</strong>
        chất lượng
      </span>
      <div className="min-h-[120px] w-full grid grid-cols-1 sm:grid-cols-4 sm:grid-flow-row gap-5">
        {DEFINE_SERVICE.map((service) => (
          <div
            className="flex flex-col justify-start sm:items-start items-center space-y-3"
            key={service.id}
          >
            <div className="h-[240px]">
              <ImageHover src={service.img} alt={service.name} />
            </div>
            <Link
              to={service.url}
              className="w-full text-2xl font-semibold text-start hover:text-blue-600 hover:cursor-pointer"
            >
              {service.name}
            </Link>
            <span className="w-full whitespace-pre-wrap">
              {displayDescription(service.description, 100)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
