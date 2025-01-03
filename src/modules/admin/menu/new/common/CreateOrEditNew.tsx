import * as React from "react";
import { INew } from "../../../../../types/new.types";
import { Button, Form, FormProps, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import ImgUpload from "../../../../../components/base/ImgUpload";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";

interface IProps {
  item?: INew;
  handleSubmit: (data: FormData, deleteThumbnail?: string | undefined) => void;
}

type FieldType = {
  name: string;
  description: string;
};

export default function CreateOrEditNew({ item, handleSubmit }: IProps) {
  const [file, setFile] = React.useState<File>();
  const [thumbnailImg, setThumbnailImg] = React.useState<string | undefined>(
    item?.thumbnailImg ?? undefined
  );
  const [content, setContent] = React.useState<string>(item?.content ?? '');

  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });

  const [deleteThumbnail, setDeleteThumbnail] = React.useState<string>();

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data = { ...values };
    if (!content) {
      message.error("Hãy nhập nội dung bài viết");
      return;
    }
    if (!(thumbnailImg || file)) {
      message.error("Hãy nhập hình ảnh đại diện bài viết");
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (file) {
      formData.append("thumbnailImg", file);
    }
    if (thumbnailImg) {
      formData.append("thumbnailImg", thumbnailImg);
    }
    if (content) {
      formData.append("content", content);
    }
    handleSubmit(formData, deleteThumbnail);
  };

  const handleUploadFile = (file: File | undefined) => {
    if(file === undefined && item) {
      setDeleteThumbnail(item.thumbnailImg);
    }
    setFile(file);
    setThumbnailImg(undefined);
  };

  if (Quill && !quill) {
    Quill.register("modules/blotFormatter", BlotFormatter);
  }

  React.useEffect(() => {
    if (quill) {
      const updateContent = () => {
        const currentContent = quill.root.innerHTML;
        setContent(currentContent);
      };
      quill.on("text-change", updateContent);
      return () => {
        quill.off("text-change", updateContent);
      };
    }
  }, [quill]);


  React.useEffect(() => {
    if(item?.id && quill) {
      quill.clipboard.dangerouslyPasteHTML(item.content);
    }
  }, [item, quill]);

  return (
    <div className="w-full pe-10">
      <Form
        className="w-full mt-5"
        form={form}
        labelCol={{ span: 6 }}
        labelAlign="left"
        name="form"
        onFinish={onFinish}
        initialValues={{
          name: item?.name,
          description: item?.description,
        }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tiêu đề bài viết"
          name="name"
          rules={[{ required: true, message: "Hãy nhập tiêu đề bài viết" }]}
        >
          <Input className="w-full" size="large" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô tả bài viết"
          name="description"
          rules={[{ required: true, message: "Hãy nhập mô tả" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item<any>
          label={
            <div className="text-sm space-x-2">
              <span className="text-red-500">*</span>
              <span>Ảnh bài viết</span>
            </div>
          }
        >
          <ImgUpload
            imgProps={thumbnailImg ?? null}
            file={file}
            handleUploadFile={(file: File | undefined) =>
              handleUploadFile(file)
            }
          />
        </Form.Item>

        <Form.Item<any>
          label={
            <div className="text-sm space-x-2">
              <span className="text-red-500">*</span>
              <span>Nội dung bài viết</span>
            </div>
          }
        >
          <div ref={quillRef} />
        </Form.Item>

        <div className="w-full flex justify-end items-end my-5">
          <Button type="primary" htmlType="submit">
            {item?.id ? "Cập nhật bài viết" : "Thêm mới bài viết"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
