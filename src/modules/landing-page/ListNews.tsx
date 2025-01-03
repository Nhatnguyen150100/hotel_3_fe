import * as React from "react";
import { INew } from "../../types/new.types";
import { Link, useNavigate } from "react-router-dom";
import newService from "../../services/newService";
import Visibility from "../../components/base/visibility";
import { Empty } from "antd";
import ImageHover from "../../components/base/ImageHover";
import { DEFINE_ROUTE } from "../../constants/route-mapper";

export default function ListNews() {
  const [newList, setNewList] = React.useState<INew[]>([]);
  const navigate = useNavigate();

  const handleGetNewList = async () => {
    const rs = await newService.getAllNew({
      page: 1,
      limit: 5,
    });
    setNewList(rs.data.content);
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
    <div className="flex flex-col justify-start items-center w-full space-y-10">
      <img width="200" height="60" src="./icontieude.png" alt="Icon tiêu đề" />
      <span className="uppercase text-[32px] sm:text-[40px] font-normal">
        <strong className="me-2">tin tức</strong>
        nổi bật
      </span>
      <Visibility
        visibility={Boolean(newList.length)}
        suspenseComponent={<Empty />}
      >
        <div className="min-h-[120px] w-full grid sm:grid-rows-2 sm:grid-flow-col gap-10">
          {newList.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`flex flex-col justify-start sm:items-start items-center space-y-3 ${
                  index === 0 && "sm:row-span-2 sm:col-span-3"
                }`}
              >
                {index !== 0 ? (
                  <div className="h-[240px]">
                    <ImageHover src={item.thumbnailImg} alt="img" />
                  </div>
                ) : (
                  <ImageHover src={item.thumbnailImg} alt="img" />
                )}

                <Link
                  to={DEFINE_ROUTE.newDetail.replace(":id", item.id)}
                  className="w-full text-lg font-semibold text-start hover:text-yellow-600"
                >
                  {item.name}
                </Link>
                <span className="w-full whitespace-pre-wrap">
                  {displayDescription(item.description, index === 0 ? 200 : 50)}
                </span>
              </div>
            );
          })}
        </div>
      </Visibility>
      <button
        onClick={() => {
          navigate(DEFINE_ROUTE.listNews);
        }}
        className="hover:text-white hover:bg-yellow-600 text-yellow-600 font-light text-lg flex justify-center items-center border border-solid rounded-3xl border-yellow-600 px-3 py-2 min-w-[220px]"
      >
        Xem thêm
      </button>
    </div>
  );
}
