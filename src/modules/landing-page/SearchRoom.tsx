import {
  EnvironmentOutlined,
  EuroCircleOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Input, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import onRemoveParams from "../../utils/on-remove-params";

interface IProps {
  handleSearch: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
}

export default function SearchRoom({handleSearch} : IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState<Dayjs | null>(
    searchParams.get("startDate") !== "null" && searchParams.get("startDate")
      ? dayjs(searchParams.get("startDate"))
      : null
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    searchParams.get("endDate") !== "null" && searchParams.get("endDate")
      ? dayjs(searchParams.get("endDate"))
      : null
  );

  return (
    <div className="bg-white rounded-lg py-5 px-4 sm:px-10 flex sm:flex-row flex-col justify-between items-end shadow-lg sm:w-max space-x-5 space-y-5">
      <div className="flex flex-col space-y-3 sm:min-w-[280px] w-full sm:w-auto">
        <label className="text-base font-medium">
          Bạn muốn nghỉ dưỡng ở đâu?
        </label>
        <Input
          className="h-[45px]"
          prefix={
            <EnvironmentOutlined
              className="me-2"
              style={{ color: "#787878" }}
            />
          }
          placeholder="Nơi bạn muốn nghỉ dưỡng"
        />
      </div>
      <div className="flex flex-col space-y-3 w-full sm:w-auto">
        <label className="text-base font-medium">Ngày nhận và trả phòng</label>
        <DatePicker.RangePicker
          onChange={(dates) => {
            if (dates?.length) {
              setStartDate(dates[0] ?? null);
              setEndDate(dates[1] ?? null);
              setSearchParams(
                onRemoveParams({
                  startDate: dates[0],
                  endDate: dates[1],
                })
              );
            } else {
              setStartDate(null);
              setEndDate(null);
              setSearchParams(
                onRemoveParams({
                  startDate: null,
                  endDate: null,
                },[null])
              );
              handleSearch(null, null);
            }
          }}
          value={[startDate, endDate]}
          placeholder={["Chọn ngày nhận", "Chọn ngày trả"]}
          className="h-[45px] w-full sm:w-[260px]"
          format="DD/MM/YYYY"
        />
      </div>
      <div className="flex flex-col space-y-3 w-full sm:w-auto">
        <label className="text-base font-medium">Số phòng</label>
        <Input
          className="h-[45px]"
          prefix={
            <HomeOutlined className="me-2" style={{ color: "#787878" }} />
          }
          placeholder="Nhập số phòng"
        />
      </div>
      <div className="flex flex-col space-y-3 w-full sm:w-auto">
        <label className="text-base font-medium">
          Thêm mã khuyến mãi / Voucher
        </label>
        <Input
          className="h-[45px]"
          prefix={
            <EuroCircleOutlined className="me-2" style={{ color: "#787878" }} />
          }
          placeholder="Nhập mã khuyến mãi"
        />
      </div>
      <Button
        className="h-[45px] bg-yellow-600 hover:!bg-yellow-500"
        type="primary"
        variant="filled"
        icon={<SearchOutlined />}
        onClick={() => {
          if(!(startDate && endDate)) {
            message.error("Vui lòng chọn ngày nhận và trả phòng");
            return;
          }
          handleSearch(startDate, endDate);
        }}
      >
        Tìm kiếm phòng
      </Button>
    </div>
  );
}
