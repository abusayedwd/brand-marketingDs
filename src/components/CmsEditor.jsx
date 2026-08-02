import React, { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { FaCircleArrowLeft } from "react-icons/fa6";
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from "../redux/features/content/contentApi";
import { normalizeRichHtml } from "../utils/htmlContent";
import RichHtml from "./RichHtml";

const CmsEditor = ({
  contentKey,
  defaultTitle,
  backPath,
  pageTitle,
}) => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const { data } = useGetContentQuery(contentKey);
  const [updateContent, { isLoading }] = useUpdateContentMutation();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState(defaultTitle);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 380,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_as_html",
      beautifyHTML: false,
      processPasteHTML: true,
    }),
    []
  );

  useEffect(() => {
    const page = data?.data?.attributes;
    if (page) {
      setContent(normalizeRichHtml(page.body || ""));
      setTitle(page.title || defaultTitle);
    }
  }, [data, defaultTitle]);

  const handleSave = async () => {
    try {
      const body = normalizeRichHtml(content);
      await updateContent({ key: contentKey, title, body }).unwrap();
      message.success("Content updated");
      navigate(backPath);
    } catch (err) {
      message.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-accent"
      >
        <FaCircleArrowLeft /> Back
      </button>
      <h1 className="page-title">{pageTitle}</h1>

      <div className="grid gap-4 xl:grid-cols-2">
        <Form layout="vertical" className="panel">
          <Form.Item label="Title">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="Content">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(value) => setContent(normalizeRichHtml(value))}
            />
          </Form.Item>
          <Button type="primary" loading={isLoading} onClick={handleSave}>
            Save changes
          </Button>
        </Form>

        <div className="panel">
          <p className="mb-3 text-sm font-semibold text-slate-600">Live preview</p>
          <RichHtml html={content} />
        </div>
      </div>
    </div>
  );
};

export default CmsEditor;
