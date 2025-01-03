import * as React from "react";
import { Link } from "react-router-dom";
import { INew } from "../../types/new.types";
import Visibility from "../../components/base/visibility";
import { Empty, Pagination } from "antd";
import ImageHover from "../../components/base/ImageHover";
import { IBaseQuery } from "../../types/query.types";
import { ScheduleOutlined } from "@ant-design/icons";
import { formatDate } from "../../utils/format-date";
import { DEFINE_ROUTE } from "../../constants/route-mapper";
import destinationService from "../../services/destinationService";

export default function ListDestinations() {
  const [newList, setNewList] = React.useState<INew[]>([]);
  const [query, setQuery] = React.useState<IBaseQuery>({
    page: 1,
    limit: 10,
  });

  const handleGetNewList = async (queryParam = query) => {
    const rs = await destinationService.getAllNew(queryParam);
    setNewList(rs.data.content);
    setQuery({
      ...queryParam,
      total: rs.data.totalCount,
    });
  };

  React.useEffect(() => {
    handleGetNewList();
  }, []);

  const displayDescription = (text: string, maxLength = 100) => {
    const lines = text.split("\n");
    const newLines = lines.map((line) => {
      if (line.length > maxLength) {
        return `${line.slice(0, maxLength)}...`;
      }
      return line;
    });
    return newLines.join("\n");
  };

  return (
    <div className="py-5 w-full container bg-transparent space-y-10">
      <h1 className="text-blue-800 text-3xl font-semibold">Điểm đến nổi bật</h1>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-10">
        <Visibility
          visibility={Boolean(newList.length)}
          suspenseComponent={<Empty />}
        >
          {newList.map((item) => {
            return (
              <div className={`flex flex-col justify-start items-start`}>
                <div className="h-[240px] w-full">
                  <ImageHover src={item.thumbnailImg} alt="img" />
                </div>
                <div className="space-y-3 bg-white py-5 px-3 rounded-b-2xl h-[220px]">
                  <Link
                    to={DEFINE_ROUTE.newDetail.replace(":id", item.id)}
                    className="w-full text-lg font-semibold text-start hover:text-yellow-600 hover:cursor-pointer"
                  >
                    {item.name}
                  </Link>
                  <div className="w-full justify-start items-end space-x-3 !mb-4">
                    <ScheduleOutlined />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                  <span className="w-full whitespace-pre-wrap">
                    {displayDescription(item.description)}
                  </span>
                </div>
              </div>
            );
          })}
        </Visibility>
      </div>
      <div className="flex w-full justify-end max-w-[1300px]">
        <Pagination
          total={query.total}
          pageSize={query.limit}
          onChange={(page) => {
            handleGetNewList({ ...query, page });
          }}
        />
      </div>
    </div>
  );
}
