const DEFINE_ROUTE = {
  home: "/",
  listRoom: "/list-rooms",
  listNews: "/list-news",
  listDestinations: "/list-destinations",
  newDetail: "/new-detail/:id",
  destinationDetail: "/destination-detail/:id",
  roomDetail: "/room-detail/:id",
  bookingPage: "/booking",
};

const DEFINE_ROUTERS_ADMIN = {
  home: "/admin",
  bannerManager: "/admin/banner-manager",
  facilitiesManager: "/admin/facilities-manager",
  newsManager: "/admin/news-manager",
  destinationsManager: "/admin/destinations-manager",
  createNew: "/admin/news-manager/new-news",
  createDestination: "/admin/destinations-manager/new-destination",
  newDetail: "/admin/news-manager/:id",
  destinationDetail: "/admin/destinations-manager/:id",
  roomManager: "/admin/room-manager",
  bookingManager: "/admin/booking-manager",
  newRoom: "/admin/room-manager/new-room",
  editRoom: "/admin/room-manager/edit-room/:id",
  loginAdmin: "/login-admin",
};

export { DEFINE_ROUTE, DEFINE_ROUTERS_ADMIN };
