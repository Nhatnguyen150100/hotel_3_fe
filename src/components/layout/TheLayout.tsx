import { Outlet } from "react-router-dom";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";
import ScrollToTop from "../base/ScrollToTop";
import { useSelector } from "react-redux";
import { IRootState } from "../../lib/store";
import Visibility from "../base/visibility";
import TheHeaderMobile from "./mobile/TheHeaderMobile";

export default function TheLayout() {
  const isMobile = useSelector((state: IRootState) => state.general.isMobile);
  return (
    <div className="w-full flex flex-col justify-start items-center overflow-y-auto min-h-screen bg-[#f4f4f5]">
      <Visibility
        visibility={!isMobile}
        suspenseComponent={<TheHeaderMobile />}
      >
        <TheHeader />
      </Visibility>
      <ScrollToTop>
        <Outlet />
      </ScrollToTop>
      <TheFooter />
    </div>
  );
}
