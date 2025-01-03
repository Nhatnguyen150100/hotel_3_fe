import { ArrowLeftOutlined } from "@ant-design/icons";
import * as React from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import roomService from "../../services/roomService";
import { IFacilitiesRooms, IRoom } from "../../types/room.types";
import { DEFINE_ROUTE } from "../../constants/route-mapper";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
} from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import CustomSwiper from "../../components/base/CustomSwiper";
import Visibility from "../../components/base/visibility";
import BaseModal from "../../components/base/BaseModal";
import { formatCurrency } from "../../utils/format-money";
import GeneralLoading from "../../components/base/GeneralLoading";
import bookingService from "../../services/bookingService";

type FieldType = {
  name: string;
  email: string;
  phoneNumber: number;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  note: string;
};

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [room, setRoom] = React.useState<IRoom>();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const roomId = searchParams.get("roomId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  React.useEffect(() => {
    if (roomId) handleGetRoom();
  }, [roomId]);

  if (!roomId) {
    message.error("Không tìm thấy phòng");
    return <Navigate to={DEFINE_ROUTE.home} replace />;
  }

  const handleGetRoom = async () => {
    const rs = await roomService.getRoom(roomId!);
    setRoom(rs.data);
  };

  const onFinish: FormProps<{
    name: string;
  }>["onFinish"] = async (values) => {
    const data = { ...values };
    if (!roomId) {
      message.error("Không tìm thấy phòng cho thuê");
      return;
    }
    try {
      setLoading(true);
      const rs = await bookingService.createBooking({...data, roomId})
      message.success(rs.message);
      navigate(DEFINE_ROUTE.home);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container bg-transparent sm:p-10 p-5">
      <div className="flex sm:flex-row flex-col justify-start sm:items-center items-start w-full mb-10 space-y-5">
        <span
          className="flex flex-row justify-start items-center transform-hover hover:text-yellow-600 hover:cursor-pointer space-x-3"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeftOutlined />
          <span className="text-lg text-nowrap">Quay lại</span>
        </span>
        <h1 className="text-2xl font-medium uppercase text-blue-900 w-full text-center">
          thông tin đặt phòng
        </h1>
      </div>
      <div className="grid sm:grid-cols-6 grid-cols-1 sm:gap-x-5 gap-y-5">
        <div className="rounded-xl bg-white p-5 col-span-4 flex flex-col justify-start items-start space-y-5">
          <h1 className="text-base font-medium">Thông tin người đặt phòng</h1>
          <Divider />
          <Form
            className="w-full mt-5"
            form={form}
            labelCol={{ span: 6 }}
            labelAlign="left"
            name="form"
            onFinish={onFinish}
            initialValues={{
              startDate: startDate !== "null" ? dayjs(startDate) : dayjs(),
              endDate: endDate !== "null" ? dayjs(endDate) : dayjs(),
            }}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Tên người đặt"
              name="name"
              rules={[{ required: true, message: "Hãy nhập tên người đặt" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập số điện thoại người đặt",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Ngày nhận phòng"
              name="startDate"
              rules={[{ required: true, message: "Hãy nhập ngày nhận phòng" }]}
            >
              <DatePicker
                placeholder="Ngày nhận"
                className="w-full"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="Ngày trả phòng"
              name="endDate"
              rules={[{ required: true, message: "Hãy nhập ngày trả phòng" }]}
            >
              <DatePicker
                placeholder="Ngày trả"
                minDate={form.getFieldValue("startDate")}
                className="w-full"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>

            <Form.Item<FieldType> label="Email" name="email">
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType> label="Số người lớn" name="adults">
              <InputNumber className="w-full" size="large" />
            </Form.Item>

            <Form.Item<FieldType> label="Số trẻ em" name="children">
              <InputNumber className="w-full" size="large" />
            </Form.Item>

            <Form.Item<FieldType> label="Ghi chú" name="note">
              <TextArea placeholder="Ghi chú đặt phòng" />
            </Form.Item>

            <div className="flex flex-row justify-end">
              <Button
                className="h-[45px] w-[320px] bg-yellow-600 rounded-2xl hover:!bg-yellow-500 text-base"
                type="primary"
                variant="filled"
                htmlType="submit"
              >
                Xác nhận
              </Button>
            </div>
          </Form>
        </div>
        <div className="rounded-xl bg-white p-5 col-span-2 space-y-5">
          <h1 className="text-base font-medium">Thông tin phòng được đặt</h1>
          <Divider />
          <Visibility visibility={Boolean(room?.id)}>
            <div className="sm:w-[380px] w-[330px] h-[200px]">
              <CustomSwiper room={room!} />
            </div>
            <div className="flex flex-col justify-start items-start w-full space-y-4 mt-4">
              <h1 className="text-xl font-semibold w-full text-start">
                {room?.name}
              </h1>
              <div className="flex flex-row items-end space-x-2">
                <img
                  className="h-6 w-6"
                  src="/icon-facilities/single-bed.png"
                />
                <span className="first-letter:capitalize text-sm">
                  {room?.bedType}
                </span>
              </div>
              <div className="flex flex-row items-end space-x-2">
                <img className="h-6 w-6" src="/icon-facilities/area.png" />
                <span className="first-letter:capitalize text-sm">
                  {room?.acreage} m<sup>2</sup>
                </span>
              </div>
              <div className="flex flex-row justify-start items-end space-x-4">
                <img className="h-6 w-6" src="/icon-facilities/dieu_hoa.png" />
                <img
                  className="h-6 w-6"
                  src="/icon-facilities/dien_thoai.png"
                />
                <img className="h-6 w-6" src="/icon-facilities/voi_sen.png" />
                <span
                  className="underline text-blue-600 hover:cursor-pointer"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Xem tất cả tiện nghi
                </span>
              </div>
              <p>{room?.description}</p>
              <div className="flex flex-col justify-start items-start space-y-1 !mt-10">
                <span className="italic text-sm">Giá chỉ từ</span>
                <span className="font-semibold text-2xl text-yellow-500">
                  {formatCurrency(room?.normalDayPrice ?? 0)}
                </span>
              </div>
            </div>
          </Visibility>
        </div>
      </div>
      <Visibility visibility={Boolean(openModal && room)}>
        <BaseModal
          isOpen={openModal}
          width={680}
          footer={null}
          handleClose={() => {
            setOpenModal(false);
          }}
        >
          <div className="py-5 flex flex-col items-start justify-start space-y-5">
            <div className="flex sm:flex-row flex-col justify-start w-full items-start sm:space-x-5 space-y-5">
              <div className="w-[320px] h-[200px]">
                {room && <CustomSwiper room={room} />}
              </div>
              <div className="flex flex-col justify-start items-start space-y-4">
                <h1 className="text-3xl font-semibold">{room?.name}</h1>
                <div className="flex flex-row items-end space-x-2">
                  <img
                    className="h-6 w-6"
                    src="/icon-facilities/single-bed.png"
                  />
                  <span className="first-letter:capitalize text-sm">
                    {room?.bedType}
                  </span>
                </div>
                <div className="flex flex-row items-end space-x-2">
                  <img className="h-6 w-6" src="/icon-facilities/area.png" />
                  <span className="first-letter:capitalize text-sm">
                    {room?.acreage} m<sup>2</sup>
                  </span>
                </div>
                <p>{room?.description}</p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-full space-y-4">
              <span className="text-lg font-bold mb-3">
                Các tiện ích có trong phòng:
              </span>
              <div className="grid grid-cols-2 gap-y-3 w-full">
                {room?.facilitiesRooms?.map((facility: IFacilitiesRooms) => (
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
                ))}
              </div>
            </div>
          </div>
        </BaseModal>
      </Visibility>
      <GeneralLoading isLoading={loading} />
    </div>
  );
}
