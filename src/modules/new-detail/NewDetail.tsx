import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { INew } from "../../types/new.types";
import newService from "../../services/newService";
import { Breadcrumb, Empty } from "antd";
import { DEFINE_ROUTE } from "../../constants/route-mapper";
import { ScheduleOutlined, TagOutlined } from "@ant-design/icons";
import { formatDate } from "../../utils/format-date";
import Visibility from "../../components/base/visibility";

export default function NewDetail() {
  const { id } = useParams<{ id: string }>();
  const [newDetail, setNewDetail] = React.useState<INew>();

  const handleGetRoom = async () => {
    const rs = await newService.getNew(id!);
    setNewDetail(rs.data);
  };

  React.useEffect(() => {
    if (id) handleGetRoom();
  }, [id]);

  return (
    <>
      <div className="w-full bg-gray-100">
        <div className="container bg-transparent py-3">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={DEFINE_ROUTE.listNews}>Danh sách tin tức</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Bài viết</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Visibility
        visibility={Boolean(newDetail?.id)}
        suspenseComponent={<Empty />}
      >
        <div className="bg-white w-full">
          <div className="container">
            <div className="flex flex-col justify-start items-start w-full space-y-5 py-8">
              <h1 className="text-3xl font-bold text-start">
                {newDetail?.name}
              </h1>
              <div className="flex flex-row justify-start items-center space-x-3">
                <div className="justify-start items-end space-x-3">
                  <TagOutlined />
                  <span className="text-gray-600">Tin tức du lịch</span>
                </div>
                <div className="justify-start items-end space-x-3">
                  <ScheduleOutlined />
                  <span>{formatDate(newDetail?.createdAt ?? "")}</span>
                </div>
              </div>
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: newDetail?.content ?? "" }}
              />
            </div>
          </div>
        </div>
      </Visibility>
    </>
  );
}
