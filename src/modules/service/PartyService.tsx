import ImageHover from "../../components/base/ImageHover";

export default function PartyService() {
  return (
    <div className="py-5 w-full container bg-transparent space-y-10 flex flex-col justify-start items-center sm:mt-0 mt-16">
      <img width="200" height="60" src="./icontieude.png" alt="Icon tiêu đề" />
      <h1 className="text-blue-800 text-3xl font-semibold">
        Dịch vụ tổ chức tiệc
      </h1>
      <p className="text-center text-md text-gray-500 italic sm:text-lg">
        Tiệc tại khách sạn Phượng Hoàng 3 Được tổ chức bởi đội ngũ chuyên nghiệp
        sẽ mang đến một buổi tiệc mà quý khách hằng mơ ước – phong cách và đáng
        nhớ. Quý khách chỉ việc chọn một trong những gói dịch vụ tiệc và chúng
        tôi sẽ thực hiện những công việc còn lại. Từ đó, quý khách có thể thoải
        mái tận hưởng bữa tiệc cưới, tiệc sinh nhật, tiệc liên hoan cuối
        năm,...hoàn hảo.,
      </p>
      <ImageHover src="/landing_page/service/party/party_1.png" />
      <ImageHover src="/landing_page/service/party/party_2.png" />
    </div>
  );
}
