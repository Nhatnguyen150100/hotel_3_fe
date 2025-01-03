import { createBrowserRouter } from "react-router-dom";
import TheLayout from "../components/layout/TheLayout";
import TheLandingPage from "../modules/landing-page/TheLandingPage";
import ErrorPage from "../pages/not-found";
import AdminPage from "../modules/admin/AdminPage";
import TheLayoutAdmin from "../modules/admin/layout/TheLayoutAdmin";
import { DEFINE_ROUTE, DEFINE_ROUTERS_ADMIN } from "../constants/route-mapper";
import LoginAdmin from "../modules/admin/auth/LoginAdmin";
import FacilitiesManager from "../modules/admin/menu/facilities/FacilitiesManager";
import RoomManager from "../modules/admin/menu/room/RoomManager";
import CreateRoom from "../modules/admin/menu/room/CreateRoom";
import EditRoom from "../modules/admin/menu/room/EditRoom";
import ListRoom from "../modules/list-room/ListRoom";
import RoomDetail from "../modules/room-detail/RoomDetail";
import BookingPage from "../modules/booking/BookingPage";
import BookingManager from "../modules/admin/menu/booking/BookingManager";
import CreateNew from "../modules/admin/menu/new/CreateNew";
import NewManager from "../modules/admin/menu/new/NewManager";
import ListNew from "../modules/list-news/ListNew";
import NewDetail from "../modules/new-detail/NewDetail";
import NewDetailAdmin from "../modules/admin/menu/new/NewDetailAdmin";
import BannerManager from "../modules/admin/menu/banner/BannerManager";
import DestinationsManager from "../modules/admin/menu/destination/DestinationsManager";
import DestinationDetailAdmin from "../modules/admin/menu/destination/DestinationDetailAdmin";
import CreateDestination from "../modules/admin/menu/destination/CreateDestination";
import DestinationDetail from "../modules/destination-detail/DestinationDetail";
import ListDestinations from "../modules/list-destinations/ListDestinations";

const router = createBrowserRouter([
  {
    path: DEFINE_ROUTE.home,
    errorElement: <ErrorPage />,
    Component: TheLayout,
    children: [
      {
        index: true,
        element: <TheLandingPage />,
      },
      {
        path: DEFINE_ROUTE.listRoom,
        element: <ListRoom />,
      },
      {
        path: DEFINE_ROUTE.listNews,
        element: <ListNew />,
      },
      {
        path: DEFINE_ROUTE.listNews,
        element: <ListNew />,
      },
      {
        path: DEFINE_ROUTE.listDestinations,
        element: <ListDestinations />,
      },
      {
        path: DEFINE_ROUTE.newDetail,
        element: <NewDetail />,
      },
      {
        path: DEFINE_ROUTE.destinationDetail,
        element: <DestinationDetail />,
      },
      {
        path: DEFINE_ROUTE.roomDetail,
        element: <RoomDetail />,
      },
      {
        path: DEFINE_ROUTE.bookingPage,
        element: <BookingPage />,
      },
    ],
  },
  {
    path: DEFINE_ROUTERS_ADMIN.home,
    errorElement: <ErrorPage />,
    Component: TheLayoutAdmin,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.bookingManager,
        element: <BookingManager />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.bannerManager,
        element: <BannerManager />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.createNew,
        element: <CreateNew />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.createDestination,
        element: <CreateDestination />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.newDetail,
        element: <NewDetailAdmin />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.destinationDetail,
        element: <DestinationDetailAdmin />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.newsManager,
        element: <NewManager />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.destinationsManager,
        element: <DestinationsManager />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.roomManager,
        element: <RoomManager />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.editRoom,
        element: <EditRoom />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.newRoom,
        element: <CreateRoom />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.facilitiesManager,
        element: <FacilitiesManager />,
      },
    ],
  },
  {
    path: DEFINE_ROUTERS_ADMIN.loginAdmin,
    element: <LoginAdmin />,
  },
]);

export default router;
