import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetContentQuery } from "../../../redux/features/content/contentApi";
import RichHtml from "../../../components/RichHtml";

const About = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetContentQuery("about");
  const page = data?.data?.attributes;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="page-title">{page?.title || "About Us"}</h1>
          <p className="page-subtitle">Rendered HTML preview for the public website.</p>
        </div>
        <Button type="primary" onClick={() => navigate("/dashboard/settings/editabout")}>
          Edit
        </Button>
      </div>
      <div className="panel">
        {isLoading ? "Loading…" : <RichHtml html={page?.body} />}
      </div>
    </div>
  );
};

export default About;
