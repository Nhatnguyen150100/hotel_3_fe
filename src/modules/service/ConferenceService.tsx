import ImageHover from "../../components/base/ImageHover";

export default function ConferenceService() {
  return (
    <div className="py-5 w-full container bg-transparent space-y-10 flex flex-col justify-start items-center">
      <img width="200" height="60" src="./icontieude.png" alt="Icon tiêu đề" />
      <h1 className="text-blue-800 text-3xl font-semibold">
        Dịch vụ tổ chức hội nghị
      </h1>
      <p className="text-center text-md text-gray-500 italic sm:text-lg">
        Vị trí ngay trung tâm TP. Thanh Hóa - Đẳng cấp tiêu chuẩn Khách sạn. Một
        địa điểm đẳng cấp khẳng định giá trị thương hiệu cùng khách hàng. Khách
        sạn Phượng Hoàng 3 cung cấp cho Qúy khách sự lựa chọn đa dạng với các
        gói tổ chức hội nghị phong phú, sức chứa đến 600 người với view trung
        tâm thành phố. Hãy gây ấn tượng với những quan khách, đối tác bằng một
        buổi tiệc, sự kiện được tổ chức nghiêm túc và chuyên nghiệp. Đội ngũ
        nhân viên hỗ trợ Qúy khách hàng lên kế hoạch và thực hiện các hội nghị,
        họp báo, sự kiện ra mắt,... một cách tỉ mỉ đến từng chi tiết để đảm bảo
        thành công của sự kiện.
      </p>
      <ImageHover src="/landing_page/service/conference/conference_1.png" />
      <ImageHover src="/landing_page/service/conference/conference_2.png" />
      <ImageHover src="/landing_page/service/conference/conference_3.png" />
      <ImageHover src="/landing_page/service/conference/conference_4.png" />
      <ImageHover src="/landing_page/service/conference/conference_5.png" />
    </div>
  );
}
