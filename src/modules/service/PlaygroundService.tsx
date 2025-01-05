import React from "react";
import ImageHover from "../../components/base/ImageHover";

export default function PlaygroundService() {
  return (
    <div className="py-5 w-full container bg-transparent space-y-10 flex flex-col justify-start items-center">
      <img width="200" height="60" src="./icontieude.png" alt="Icon tiêu đề" />
      <h1 className="text-blue-800 text-3xl font-semibold">
        Dịch vụ khu vui chơi
      </h1>
      <p className="text-center text-md text-gray-500 italic sm:text-lg">
        Với không gian vui chơi tại khách sạn Phượng Hoàng 3 sẽ mang đến cho các
        bé nơi lý tưởng để thỏa sức giải trí cùng gia đình. Khu vui chơi với
        trang thiết bị hiện đại trong không gian riêng tư, cùng các trò chơi và
        hoạt động sáng tạo hứa hẹn sẽ mang đến cho các bé khoảnh khắc ý nghĩa và
        kỳ nghỉ của gia đình thêm phần thú vị và thư thái hơn.
      </p>
      <ImageHover src="/landing_page/service/playground/playground.jpg" />
      <ImageHover src="/landing_page/service/playground/playground.jpg" />
    </div>
  );
}
