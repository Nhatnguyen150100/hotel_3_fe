import { Link } from "react-router-dom";
import { DEFINE_ROUTE } from "../../constants/route-mapper";
import { Button } from "antd";

export default function TheHeader() {
  return (
    <header className={`w-full header`}>
      <div className="flex flex-row justify-center items-center w-full relative container">
        <div className="flex justify-start items-center space-x-3 absolute left-0">
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
        <Link to={DEFINE_ROUTE.home}>
          <img className="h-20" src="/logo.png" alt="logo" />
        </Link>
        <div className="absolute right-0 flex flex-row justify-start items-center space-x-5">
          <div className="flex flex-row justify-start items-center">
            <i className="fa fa-bars"></i>
            <img className="max-h-[40px]" src="/map.png" />
            <a
              className="underline font-medium hover:text-yellow-600"
              target="_blank"
              href="https://maps.app.goo.gl/WLt8oCQ4D9wWQxxP7"
            >
              Bản đồ
            </a>
          </div>
          <Button type="default" variant="outlined">
            Đăng nhập
          </Button>
        </div>
      </div>
    </header>
  );
}
