import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IQueryUser } from "../../../../types/user.types";
import { INew } from "../../../../types/new.types";
import newService from "../../../../services/newService";
import { Button, message, Modal, Spin, Table, TableProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DEFINE_ROUTERS_ADMIN } from "../../../../constants/route-mapper";
import BaseSearch from "../../../../components/base/BaseSearch";

export default function NewManager() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState<Partial<IQueryUser>>({
    page: 1,
    limit: 5,
    nameLike: "",
  });
  const [newList, setNewList] = React.useState<INew[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetNewList = async (queryParam = query) => {
    try {
      setLoading(true);
      delete queryParam.total;
      const rs = await newService.getAllNew(queryParam);
      setNewList(rs.data.content);
      setQuery({
        ...queryParam,
        total: rs.data.totalCount,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (_new: INew) => {
    Modal.confirm({
      title: "Bạn có muốn xóa bài viết này",
      content: `Tiêu đề bài viết: ${_new.name}`,
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
          const rs = await newService.deleteNew(_new.id);
          message.success(rs.message);
          handleGetNewList();
        } catch (error: any) {
          message.error(error.message);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  React.useEffect(() => {
    handleGetNewList();
  }, []);

  const columns: TableProps<INew>["columns"] = [
    {
      title: "Số thứ tự",
      key: "index",
      render: (_: any, __: any, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      title: "Tiêu đề bài viết",
      dataIndex: "name",
      align: "center",
      key: "name",
      render: (text) => <span className="text-lg font-medium">{text}</span>,
    },
    {
      title: "Ảnh bài viết",
      dataIndex: "thumbnailImg",
      align: "center",
      key: "icon",
      render: (img) => <img className="h-[60px]" src={img} />,
    },
    {
      title: "Tóm tắt bài viết",
      dataIndex: "description",
      align: "center",
      key: "description",
      render: (text) => {
        const maxLength = 100;
        const displayText =
          text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

        return (
          <span className="text-sm max-w-[480px] text-ellipsis" title={text}>
            {displayText}
          </span>
        );
      },
    },
    {
      title: "Xóa bài viết",
      key: "deleteNew",
      align: "center",
      dataIndex: "deleteNew",
      render: (_, _item: INew) => (
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

  const handleClickRow = (record: INew) => {
    navigate(DEFINE_ROUTERS_ADMIN.newDetail.replace(":id", record.id));
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <h1 className="font-bold text-2xl">Danh sách các bài viết</h1>
        <div className="flex flex-row justify-between items-center w-full">
          <BaseSearch
            value={query.nameLike!}
            onHandleChange={(value) => {
              setQuery({ ...query, nameLike: value });
              if (!value)
                handleGetNewList({
                  page: query.page,
                  limit: query.limit,
                });
            }}
            onSearch={() => handleGetNewList()}
          />
          <Button
            type="primary"
            variant="filled"
            onClick={() => {
              navigate(DEFINE_ROUTERS_ADMIN.createNew);
            }}
          >
            Thêm 1 bài viết mới
          </Button>
        </div>
        {loading ? (
          <Spin />
        ) : (
          <div className="w-full">
            <Table<INew>
              rowKey="id"
              className="hover:cursor-pointer"
              columns={columns}
              onRow={(record) => ({
                onClick: () => handleClickRow(record),
              })}
              dataSource={newList}
              pagination={{
                current: query.page,
                pageSize: query.limit,
                total: query.total,
                onChange: (page, limit) => {
                  handleGetNewList({
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
    </>
  );
}
