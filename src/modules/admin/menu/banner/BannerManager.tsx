import * as React from "react";
import { IBaseQuery } from "../../../../types/query.types";
import Visibility from "../../../../components/base/visibility";
import { IBanner } from "../../../../types/banner.types";
import bannerService from "../../../../services/bannerService";
import { Button, Empty, message, Modal, Spin, Table, TableProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CreateImageBannerModal from "./CreateImageBannerModal";
import imagesService from "../../../../services/imagesService";

export default function BannerManager() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<IBaseQuery>({
    page: 1,
    limit: 5,
  });
  const [listImages, setListImages] = React.useState<IBanner[]>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleGetListImages = async () => {
    try {
      setLoading(true);
      const rs = await bannerService.getAllImagesBanner(query);
      setListImages(rs.data.content);
      setQuery({
        ...query,
        total: rs.data.totalCount,
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleGetListImages();
  }, [query.page]);

  const handleDeleteRoom = async (_item: IBanner) => {
    Modal.confirm({
      title: "Bạn có muốn xóa ảnh bìa này",
      content: `Ảnh: ${_item.url}`,
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy",
      style: {
        top: "50%",
        transform: "translateY(-50%)",
      },
      onOk: async () => {
        try {
          setLoading(true);
          await imagesService.deleteImages([_item.url]);
          const rs = await bannerService.deleteImageBanner(_item.id);
          message.success(rs.message);
          handleGetListImages();
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns: TableProps<IBanner>["columns"] = [
    {
      title: "Số thứ tự",
      key: "index",
      render: (_: any, __: any, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      title: "Ảnh bìa",
      dataIndex: "url",
      key: "icon",
      render: (url) => <img className="h-[100px]" src={url} />,
    },
    {
      title: "Xóa ảnh",
      key: "deleteImage",
      align: "center",
      render: (_, _item: IBanner) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteRoom(_item);
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

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <h1 className="font-bold text-2xl">Danh sách ảnh bìa trang chủ</h1>
        <div className="flex flex-row justify-end items-center mb-5 w-full">
          <Button
            type="primary"
            variant="filled"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Thêm 1 ảnh mới
          </Button>
        </div>
        <div className="flex justify-start items-center flex-col w-full">
          <Visibility
            visibility={listImages.length}
            suspenseComponent={loading ? <Spin /> : <Empty />}
          >
            <div className="w-full">
              <Table<IBanner>
                rowKey="id"
                className="hover:cursor-pointer"
                columns={columns}
                dataSource={listImages}
                pagination={{
                  current: query.page,
                  pageSize: query.limit,
                  total: query.total,
                  onChange: (page, limit) => {
                    setQuery((query) => ({
                      ...query,
                      page,
                      limit,
                    }));
                  },
                }}
              />
            </div>
          </Visibility>
          <CreateImageBannerModal
            isOpen={openModal}
            handleOk={() => {
              handleGetListImages();
              setOpenModal(false);
            }}
            handleClose={() => {
              setOpenModal(false);
            }}
          />
        </div>
      </div>
    </>
  );
}
