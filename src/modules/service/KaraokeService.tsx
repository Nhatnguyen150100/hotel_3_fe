import ImageHover from "../../components/base/ImageHover";

export default function KaraokeService() {
  return (
    <div className="py-5 w-full container bg-transparent space-y-10 flex flex-col justify-start items-center">
      <img width="200" height="60" src="./icontieude.png" alt="Icon tiêu đề" />
      <h1 className="text-blue-800 text-3xl font-semibold">Dịch vụ karaoke</h1>
      <p className="text-center text-md text-gray-500 italic sm:text-lg">
        Phòng hát Karaoke tại Khách sạn Phượng Hoàng 3 được bố trí những phòng
        tốt nhất Gồm các loại phòng hát lớn, mỗi phòng có sức chứa trên 10
        người. Ngoài ra, các phòng Karaoke được bài trí sang trọng mà không kém
        phần lãng mạn của hệ thống đèn màu và âm thanh hiện đại, phòng Karaoke
        tại khách sạn sẽ đem đến không khí tươi vui và thăng hoa cùng âm nhạc
        cho Qúy khách.
      </p>
      <ImageHover src="/landing_page/service/karaoke/karaoke.png" />
      <ImageHover src="/landing_page/service/karaoke/karaoke.png" />
    </div>
  );
}
