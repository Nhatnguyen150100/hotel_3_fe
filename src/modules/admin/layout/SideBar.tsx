
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  LoginOutlined,
  AppstoreAddOutlined,
  PieChartOutlined,
  FormOutlined,
  FileImageOutlined,
  AimOutlined,
} from "@ant-design/icons";
import isChildUrl from "../../../utils/check-active-router";
import { DEFINE_ROUTERS_ADMIN } from "../../../constants/route-mapper";
import cookiesStore from "../../../plugins/cookiesStore";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: DEFINE_ROUTERS_ADMIN.bookingManager,
      label: "Danh sách đặt phòng",
      icon: <PieChartOutlined />,
    },
    {
      path: DEFINE_ROUTERS_ADMIN.bannerManager,
      label: "Quản lý ảnh bìa",
      icon: <FileImageOutlined />,
    },
    {
      path: DEFINE_ROUTERS_ADMIN.roomManager,
      label: "Quản lý phòng",
      icon: <HomeOutlined />,
    },
    {
      path: DEFINE_ROUTERS_ADMIN.facilitiesManager,
      label: "Quản lý tiện ích",
      icon: <AppstoreAddOutlined />,
    },
    {
      path: DEFINE_ROUTERS_ADMIN.newsManager,
      label: "Quản lý bài viết",
      icon: <FormOutlined />,
    },
    {
      path: DEFINE_ROUTERS_ADMIN.destinationsManager,
      label: "Quản lý điểm đến",
      icon: <AimOutlined />
    },
  ];

  const handleLogOut = () => {
    cookiesStore.remove("admin");
    cookiesStore.remove("access_token");
    window.location.href = DEFINE_ROUTERS_ADMIN.home;
  };

  return (
    <div className="flex flex-col w-80 h-screen bg-black text-white">
      <div className="flex items-center justify-center h-16">
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <div className="flex flex-col mt-4 px-5 space-y-3">
        {menuItems.map((item) => {
          const isActive = isChildUrl(item.path, location.pathname);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center py-3 px-4 hover:bg-white hover:text-black transition-colors rounded-2xl ${
                isActive ? "bg-white text-black" : ""
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
        <div
          className="flex items-center py-3 px-4 hover:cursor-pointer hover:bg-white hover:text-black transition-colors rounded-2xl"
          onClick={handleLogOut}
        >
          <span className="mr-2">{<LoginOutlined />}</span>
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
