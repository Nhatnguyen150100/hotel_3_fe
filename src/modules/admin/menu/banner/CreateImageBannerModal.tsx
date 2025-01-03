import * as React from "react";
import BaseModal from "../../../../components/base/BaseModal";
import { message } from "antd";
import bannerService from "../../../../services/bannerService";
import ImgUpload from "../../../../components/base/ImgUpload";

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  handleOk: () => void;
}

export default function CreateImageBannerModal({
  isOpen,
  handleClose,
  handleOk
}: IProps) {
  const [file, setFile] = React.useState<File>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleCreateImage = async () => {
    if (!file) {
      message.error("Hãy chọn ảnh để tải lên.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("url", file);
      const rs = await bannerService.createImageBanner(formData);
      message.success(rs.message);
      handleOk();
      setFile(undefined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      loading={loading}
      title="Tải lên ảnh bìa"
      handleClose={() => {
        setFile(undefined);
        handleClose();
      }}
      onOk={handleCreateImage}
    >
      <ImgUpload
        imgProps={null}
        file={file}
        handleUploadFile={(file: File | undefined) => {
          setFile(file);
        }}
      />
    </BaseModal>
  );
}
