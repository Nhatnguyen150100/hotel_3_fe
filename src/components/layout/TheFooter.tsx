import { MailFilled, PhoneFilled } from "@ant-design/icons";
import { Divider } from "antd";

export default function TheFooter() {
  return (
    <footer className="p-6 md:p-24 w-full bg-[var(--bg-footer)]">
      <div className="container bg-transparent flex flex-col items-center justify-start space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-start items-start space-y-4">
            <h3 className="font-semibold text-white text-xl">
              KHÁCH SẠN PHƯỢNG HOÀNG 2
            </h3>
            <Divider variant="solid" className="border-[1px] border-gray-300" />
            <p className="text-[var(--color-text-footer)]">
              Khách sạn Phượng Hoàng 2 đạt tiêu chuẩn 3 sao tọa lạc tại mặt
              biển, đường Hồ Xuân Hương, Sầm Sơn Thanh Hóa. Khách sạn xây dựng
              16 tầng với 130 phòng nghỉ, hầu hết các phòng đều hướng ra biển
              Sầm Sơn. Với sức chứa lên tới 600 tại hội trường tầng 2, khách sạn
              Phượng Hoàng 2 là địa điểm tuyệt vời để quý khách hàng tổ chức sự
              kiện.
            </p>
          </div>
          <div className="flex flex-col justify-start items-start space-y-4">
            <h3 className="font-semibold text-white text-xl">
              THÔNG TIN LIÊN HỆ
            </h3>
            <Divider variant="solid" className="border-[1px] border-gray-300" />
            <div className="flex items-center space-x-2">
              <MailFilled style={{ color: "white" }} />
              <a
                href="mailto:gm@phoenixhotel.vn"
                className="text-[var(--color-text-footer)] hover:text-white hover:underline"
              >
                gm@phoenixhotel.vn
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneFilled style={{ color: "white" }} />
              <a
                href="tel:0945.293.201"
                className="text-[var(--color-text-footer)] hover:text-white hover:underline"
              >
                Phone: 0945.293.201
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <img className="h-[24px]" src="/zalo-icon.png" alt="Zalo Icon" />
              <a
                href="https://zalo.me/0945.293.201"
                className="text-[var(--color-text-footer)] hover:text-white hover:underline"
              >
                Zalo: 0945.293.201
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <img
                className="h-[24px]"
                src="/location-map.png"
                alt="Location Icon"
              />
              <span className="text-[var(--color-text-footer)]">
                Bãi tắm C, Đường Hồ Xuân Hương – P.Trung Sơn – TP Sầm Sơn, Thanh
                Hóa
              </span>
            </div>
          </div>
        </div>
        <Divider variant="solid" className="border-[1px] border-gray-300" />
        <div className="flex-col flex justify-start items-start space-y-5 w-full">
          <h3 className="font-semibold text-white text-xl">
            Địa chỉ trên bản đồ
          </h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2655.3647792743554!2d105.9051034559221!3d19.7444076531674!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x23c7888fe0a0c3b5!2zS2jDoWNoIFPhuqFuIFBoxrDhu6NuZyBIb8OgbmcgMg!5e0!3m2!1sen!2s!4v1558415823857!5m2!1sen!2s"
            width="100%"
            height="250"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <Divider variant="solid" className="border-[1px] border-gray-300" />
      <div className="container flex justify-center items-center bg-transparent relative flex-col md:flex-row">
        <span className="text-white absolute left-0 text-center md:text-left hidden md:block">
          © 2024 Phuong Hoang Hospitality. All Rights Reserved.
        </span>
        <h3 className="font-semibold text-white text-xl mt-4 md:mt-0">
          KHÁCH SẠN PHƯỢNG HOÀNG 2
        </h3>
        <div className="flex justify-center md:justify-start items-center space-x-3 absolute right-0 hidden md:block">
          <a
            href="https://www.facebook.com/khachsanphuonghoangsamson"
            target="_blank"
          >
            <img
              src="/icons/facebook.png"
              className="h-[24px] cursor-pointer hover-grow"
              alt="facebook"
            />
          </a>
          <a
            href="https://www.tiktok.com/@ksphuonghoang2samson"
            target="_blank"
          >
            <img
              src="/icons/tik-tok.png"
              className="h-[24px] cursor-pointer hover-grow"
              alt="tik-tok"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
