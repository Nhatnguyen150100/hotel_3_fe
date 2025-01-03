import { IFacilities } from "../../../../types/facilities.types";
import BaseModal from "../../../../components/base/BaseModal";
import { Button, Form, Input, Select } from "antd";

interface IProps {
  item?: IFacilities;
  isOpenModal: boolean;
  handleClose: () => void;
  onFinish?: ((values: any) => void) | undefined;
}

type FieldType = {
  name: string;
  icon: string;
};

const OPTIONS_SELECT_ICON = [
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/view_city.png"
        />
        <span>View City</span>
      </div>
    ),
    value: "view_city",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/ban_lam_viec.png"
        />
        <span>Bàn làm việc</span>
      </div>
    ),
    value: "ban_lam_viec",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img className="h-[24px] w-[24px]" src="/icon-facilities/bon_tam.png" />
        <span>Bồn tắm</span>
      </div>
    ),
    value: "bon_tam",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img className="h-[24px] w-[24px]" src="/icon-facilities/den_ban.png" />
        <span>Đèn bàn</span>
      </div>
    ),
    value: "den_ban",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/dien_thoai.png"
        />
        <span>Điện thoại</span>
      </div>
    ),
    value: "dien_thoai",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/dieu_hoa.png"
        />
        <span>Điều hòa</span>
      </div>
    ),
    value: "dieu_hoa",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/do_phong_tam.png"
        />
        <span>Đồ phòng tắm</span>
      </div>
    ),
    value: "do_phong_tam",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/ga_giuong.png"
        />
        <span>Ga giường</span>
      </div>
    ),
    value: "ga_giuong",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img className="h-[24px] w-[24px]" src="/icon-facilities/giat_ui.png" />
        <span>Giặt ủi</span>
      </div>
    ),
    value: "giat_ui",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img className="h-[24px] w-[24px]" src="/icon-facilities/ket_sat.png" />
        <span>Két sắt</span>
      </div>
    ),
    value: "ket_sat",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/khan_tam.png"
        />
        <span>Khăn tắm</span>
      </div>
    ),
    value: "khan_tam",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/khong_hut_thuoc.png"
        />
        <span>Không hút thuốc</span>
      </div>
    ),
    value: "khong_hut_thuoc",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/may_say_toc.png"
        />
        <span>Máy sấy tóc</span>
      </div>
    ),
    value: "may_say_toc",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/phong_tam_voi_hoa_sen.png"
        />
        <span>Phòng tắm vòi hoa sen</span>
      </div>
    ),
    value: "phong_tam_voi_hoa_sen",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/quay_bar_mini.png"
        />
        <span>Quầy bar mini</span>
      </div>
    ),
    value: "quay_bar_mini",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/truyen_hinh_cap.png"
        />
        <span>Truyền hình cáp</span>
      </div>
    ),
    value: "truyen_hinh_cap",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/tu_quan_ao.png"
        />
        <span>Tủ quần áo</span>
      </div>
    ),
    value: "tu_quan_ao",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img className="h-[24px] w-[24px]" src="/icon-facilities/voi_sen.png" />
        <span>Vòi sen</span>
      </div>
    ),
    value: "voi_sen",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img className="h-[24px] w-[24px]" src="/icon-facilities/wifi.png" />
        <span>Wifi</span>
      </div>
    ),
    value: "wifi",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/tea-ceremony.png"
        />
        <span>Trà, Cà phê</span>
      </div>
    ),
    value: "tea-ceremony",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img className="h-[24px] w-[24px]" src="/icon-facilities/parking.png" />
        <span>Đỗ xe</span>
      </div>
    ),
    value: "parking",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/double-bed.png"
        />
        <span>Giường đôi</span>
      </div>
    ),
    value: "double-bed",
  },
  {
    label: (
      <div className="flex flex-row justify-start items-center space-x-3">
        <img
          className="h-[24px] w-[24px]"
          src="/icon-facilities/single-bed.png"
        />
        <span>Giường đơn</span>
      </div>
    ),
    value: "single-bed",
  },
];

export default function FacilityForm({
  item,
  isOpenModal,
  handleClose,
  onFinish,
}: IProps) {
  const [form] = Form.useForm();
  return (
    <BaseModal
      isOpen={isOpenModal}
      width={500}
      destroyOnClose
      footer={null}
      handleClose={handleClose}
      title={`${item ? "Sửa tiện ích" : "Thêm tiện ích mới"}`}
    >
      <div className="w-full mt-10">
        <Form
          className="w-full mt-5"
          form={form}
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="form"
          onFinish={onFinish}
          initialValues={{
            name: item?.name,
            icon: item?.icon,
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Tên tiện ích"
            name="name"
            rules={[{ required: true, message: "Hãy nhập tên tiện ích" }]}
          >
            <Input placeholder="Nhập tên tiện ích" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Icon"
            name="icon"
            rules={[{ required: true, message: "Hãy nhập tiện ích" }]}
          >
            <Select allowClear options={OPTIONS_SELECT_ICON} />
          </Form.Item>

          <div className="w-full flex justify-end items-end my-5">
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </div>
        </Form>
      </div>
    </BaseModal>
  );
}
