import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetContentQuery } from "../../../redux/features/content/contentApi";
import RichHtml from "../../../components/RichHtml";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetContentQuery("privacy");
  const page = data?.data?.attributes;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="page-title">{page?.title || "Privacy Policy"}</h1>
          <p className="page-subtitle">Rendered HTML preview for the public website.</p>
        </div>
        <Button type="primary" onClick={() => navigate("/dashboard/settings/editprivacypolicy")}>
          Edit
        </Button>
      </div>
      <div className="panel">
        {isLoading ? "Loading…" : <RichHtml html={page?.body} />}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
