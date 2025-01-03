import * as React from "react";
import { IBooking } from "../../../../types/booking.types";
import BaseModal from "../../../../components/base/BaseModal";
import Visibility from "../../../../components/base/visibility";
import { formatDate } from "../../../../utils/format-date";
import { Divider, Tooltip } from "antd";
import CustomSwiper from "../../../../components/base/CustomSwiper";
import { IFacilitiesRooms, IRoom } from "../../../../types/room.types";
import roomService from "../../../../services/roomService";

interface IProps {
  booking: IBooking;
  isOpenModal: boolean;
  handleClose: () => void;
}

export default function BookingForm({
  booking,
  isOpenModal,
  handleClose,
}: IProps) {
  const [roomDetail, setRoomDetail] = React.useState<IRoom>();

  const handleGetRoom = async () => {
    const rs = await roomService.getRoom(booking.room.id);
    setRoomDetail(rs.data);
  };

  React.useEffect(() => {
    if (booking.room.id) handleGetRoom();
  }, [booking.room.id]);

  return (
    <BaseModal
      isOpen={isOpenModal}
      width="1080px"
      handleClose={handleClose}
      title="Chi tiết thông tin đặt phòng"
      footer={null}
    >
      <div className="py-5 grid grid-cols-5 gap-x-5 w-full h-full overflow-y-auto max-h-[560px]">
        <div className="flex flex-col justify-start items-start space-y-3 border border-dashed rounded-xl col-span-3 py-8 px-5">
          <h1 className="text-base font-medium">Thông tin người đặt phòng</h1>
          <Divider />
          <div className="flex flex-row justify-between items-center w-full">
            <label className="text-base">Tên người đặt</label>
            <span className="text-base font-medium">{booking.name}</span>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <label className="text-base">Số điện thoại người đặt</label>
            <Tooltip title="Nhấn để gọi">
              <a
                href={`tel:${booking.phoneNumber}`}
                className="text-base font-medium hover:underline text-blue-800"
              >
                {booking.phoneNumber}
              </a>
            </Tooltip>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <label className="text-base">Ngày nhận phòng</label>
            <span className="text-base font-medium">
              {formatDate(booking.startDate)}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <label className="text-base">Ngày trả phòng</label>
            <span className="text-base font-medium">
              {formatDate(booking.endDate)}
            </span>
          </div>
          <Visibility visibility={Boolean(booking.email)}>
            <div className="flex flex-row justify-between items-center w-full">
              <label className="text-base">Email người đặt</label>
              <span className="text-base font-medium">{booking.name}</span>
            </div>
          </Visibility>
          <Visibility visibility={Boolean(booking.adults)}>
            <div className="flex flex-row justify-between items-center w-full">
              <label className="text-base">Số người lớn</label>
              <span className="text-base font-medium">{booking.adults}</span>
            </div>
          </Visibility>
          <Visibility visibility={Boolean(booking.children)}>
            <div className="flex flex-row justify-between items-center w-full">
              <label className="text-base">Số trẻ em</label>
              <span className="text-base font-medium">{booking.children}</span>
            </div>
          </Visibility>
          <Visibility visibility={Boolean(booking.note)}>
            <div className="flex flex-row justify-between items-center w-full">
              <label className="text-base">Ghi chú của người đặt</label>
              <pre className="text-base font-normal font-sans">
                {booking.note}
              </pre>
            </div>
          </Visibility>
        </div>
        <div className="flex flex-col justify-start items-start space-y-3 border border-dashed rounded-xl col-span-2 py-8 px-5">
          <h1 className="text-base font-medium">Thông tin người đặt phòng</h1>
          <Divider />
          <div className="w-[320px] h-[200px]">
            <CustomSwiper room={booking.room} />
          </div>
          <div className="flex flex-col justify-start items-start w-full space-y-4 mt-4">
            <h1 className="text-xl font-semibold w-full text-start">
              {booking.room?.name}
            </h1>
            <div className="flex flex-row items-end space-x-2">
              <img className="h-6 w-6" src="/icon-facilities/single-bed.png" />
              <span className="first-letter:capitalize text-sm">
                {booking.room?.bedType}
              </span>
            </div>
            <div className="flex flex-row items-end space-x-2">
              <img className="h-6 w-6" src="/icon-facilities/area.png" />
              <span className="first-letter:capitalize text-sm">
                {booking.room?.acreage} m<sup>2</sup>
              </span>
            </div>
            <h1 className="text-base font-medium">Tiện ích trong phòng</h1>
            <div className="grid grid-cols-2 gap-y-2 w-full">
              <Visibility
                visibility={Boolean(roomDetail?.facilitiesRooms?.length)}
              >
                {roomDetail?.facilitiesRooms?.map(
                  (facility: IFacilitiesRooms) => (
                    <div
                      key={facility.id}
                      className="flex items-center space-x-2"
                    >
                      <img
                        className="h-6 w-6"
                        src={`/icon-facilities/${facility.facility.icon}.png`}
                      />
                      <span>{facility.facility.name}</span>
                    </div>
                  )
                )}
              </Visibility>
            </div>
            <p>{booking.room?.description}</p>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
