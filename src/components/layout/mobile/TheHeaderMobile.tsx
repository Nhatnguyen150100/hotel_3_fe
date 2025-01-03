import * as React from "react";
import { DEFINE_ROUTE } from "../../../constants/route-mapper";
import { Link } from "react-router-dom";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer } from "antd";

export default function TheHeaderMobile() {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  return (
    <header className="w-full header">
      <div className="flex flex-row justify-between items-center px-3 py-2">
        <Link to={DEFINE_ROUTE.home}>
          <img className="h-12" src="/logo.png" alt="logo" />
        </Link>
        <Button
          type="text"
          className="border-none p-0 h-[40px]"
          icon={<AlignLeftOutlined className="!text-xl" />}
          onClick={() => {
            setOpenDrawer((pre) => !pre);
          }}
        />
      </div>
      <Drawer
        title={
          <div className="w-full flex justify-center items-center">
            <Link to={DEFINE_ROUTE.home}>
              <img className="h-12" src="/logo.png" alt="logo" />
            </Link>
          </div>
        }
        closeIcon={false}
        width={320}
        onClose={() => {
          setOpenDrawer(false);
        }}
        open={openDrawer}
      >
        <Link
          className="text-base font-medium"
          to={DEFINE_ROUTE.home}
          onClick={() => {
            setOpenDrawer(false);
          }}
        >
          Trang chủ
        </Link>
        <Divider className="my-3" />
        <Link
          className="text-base font-medium"
          to={DEFINE_ROUTE.listRoom}
          onClick={() => {
            setOpenDrawer(false);
          }}
        >
          Đặt phòng
        </Link>
        <Divider className="my-3" />
        <Link
          className="text-base font-medium"
          to={DEFINE_ROUTE.listNews}
          onClick={() => {
            setOpenDrawer(false);
          }}
        >
          Tin tức
        </Link>
        <Divider className="my-3" />
        <div className="flex justify-center items-center space-x-3 my-5">
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
        <Divider className="my-3" />
        <div className="flex flex-row justify-center items-center space-x-2">
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
      </Drawer>
    </header>
  );
}
