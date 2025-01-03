import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";
import { Button } from "antd";

const Editor = () => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });

  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const currentContent = quill?.root.innerHTML;
    setContent(currentContent as string);
    console.log("🚀 ~ handleSubmit ~ content:", currentContent);
  };

  if (Quill && !quill) {
    Quill.register("modules/blotFormatter", BlotFormatter);
  }

  useEffect(() => {
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

  return (
    <div>
      <div ref={quillRef} />
      <Button type="primary" onClick={handleSubmit}>
        Upload
      </Button>
      <div className="preview w-full">
        <h3>Preview:</h3>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Editor;
