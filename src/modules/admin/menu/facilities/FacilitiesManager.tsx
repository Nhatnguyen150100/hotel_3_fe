import {
  Button,
  FormProps,
  message,
  Modal,
  notification,
  Spin,
  Table,
  TableProps,
} from "antd";
import * as React from "react";
import BaseSearch from "../../../../components/base/BaseSearch";
import { IQueryUser } from "../../../../types/user.types";
import facilitiesService from "../../../../services/facilitiesService";
import { IFacilities } from "../../../../types/facilities.types";
import Visibility from "../../../../components/base/visibility";
import FacilityForm from "./FacilityForm";
import { DeleteOutlined } from "@ant-design/icons";

export default function FacilitiesManager() {
  const [query, setQuery] = React.useState<Partial<IQueryUser>>({
    page: 1,
    limit: 5,
    nameLike: "",
  });
  const [facilitiesList, setFacilities] = React.useState<IFacilities[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedFacility, setSelectedFacility] = React.useState<IFacilities>();

  const onFinish: FormProps<{
    name: string;
    icon: string;
  }>["onFinish"] = async (values) => {
    const data = { ...values };
    try {
      setLoading(true);
      const rs = selectedFacility?.id
        ? await facilitiesService.updateFacility(selectedFacility.id, data)
        : await facilitiesService.createFacility({
            name: data.name,
            icon: data.icon,
          });
      message.success(rs.message);
      handleGetFacilitiesList();
      setOpenModal(false);
      setSelectedFacility(undefined);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetFacilitiesList = async (queryParam = query) => {
    try {
      setLoading(true);
      delete queryParam.total;
      const rs = await facilitiesService.getAllFacilities(queryParam);
      setFacilities(rs.data.content);
      setQuery({
        ...queryParam,
        total: rs.data.totalCount,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFacility = async (_facility: IFacilities) => {
    Modal.confirm({
      title: "Bạn có muốn xóa tiện ích này này?",
      content: (
        <div className="flex flex-col justify-start items-start space-y-3 mb-5">
          <span className="text-lg font-semibold">
            Tên tiện ích: {_facility.name}
          </span>
          <span className="text-lg font-semibold">Icon: {_facility.icon}</span>
        </div>
      ),
      okText: "Đồng ý",
      okType: "primary",
      cancelText: "Hủy",
      style: {
        top: "50%",
        transform: "translateY(-50%)",
      },
      onOk: async () => {
        try {
          setLoading(true);
          const rs = await facilitiesService.deleteFacility(_facility.id);
          message.success(rs.message);
          notification.success({
            message: "Thành công",
            description: rs.message,
          });
          handleGetFacilitiesList();
        } finally {
          setLoading(false);
        }
      },
    });
  };

  React.useEffect(() => {
    handleGetFacilitiesList();
  }, []);

  const columns: TableProps<IFacilities>["columns"] = [
    {
      title: "Số thứ tự",
      key: "index",
      render: (_: any, __: any, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      title: "Tên tiện ích",
      dataIndex: "name",
      align: "center",
      key: "name",
      render: (text) => <span className="text-lg font-medium">{text}</span>,
    },
    {
      title: "Icon",
      dataIndex: "icon",
      className: "flex flex-row justify-center h-[70px]",
      key: "icon",
      render: (icon) => (
        <img
          className="h-[30px] w-[30px]"
          src={`/icon-facilities/${icon}.png`}
        />
      ),
    },
    {
      title: "Xóa tiện ích",
      key: "deleteFacility",
      align: "center",
      dataIndex: "deleteFacility",
      render: (_, _item: IFacilities) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteFacility(_item);
          }}
          className="ms-3"
          variant="solid"
          color="danger"
          shape="default"
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  const handleClickRow = (record: IFacilities) => {
    setSelectedFacility(record);
    setOpenModal(true);
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <h1 className="font-bold text-2xl">
          Danh sách các tiện ích trong phòng
        </h1>
        <div className="flex flex-row justify-between items-center w-full">
          <BaseSearch
            value={query.nameLike!}
            onHandleChange={(value) => {
              setQuery({ ...query, nameLike: value });
              if (!value)
                handleGetFacilitiesList({
                  page: query.page,
                  limit: query.limit,
                });
            }}
            onSearch={() => handleGetFacilitiesList()}
          />
          <Button
            type="primary"
            variant="filled"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Thêm 1 tiện ích mới
          </Button>
        </div>
        {loading ? (
          <Spin />
        ) : (
          <div className="w-full">
            <Table<IFacilities>
              rowKey="id"
              columns={columns}
              onRow={(record) => ({
                onClick: () => handleClickRow(record),
              })}
              dataSource={facilitiesList}
              pagination={{
                current: query.page,
                pageSize: query.limit,
                total: query.total,
                onChange: (page, limit) => {
                  handleGetFacilitiesList({
                    ...query,
                    page,
                    limit,
                  });
                },
              }}
            />
          </div>
        )}
      </div>
      <Visibility visibility={openModal}>
        <FacilityForm
          isOpenModal={openModal}
          item={selectedFacility}
          handleClose={() => {
            setOpenModal(false);
            setSelectedFacility(undefined);
          }}
          onFinish={onFinish}
        />
      </Visibility>
    </>
  );
}
