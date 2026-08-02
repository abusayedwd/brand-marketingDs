import React, { useMemo } from "react";
import { normalizeRichHtml } from "../utils/htmlContent";

const RichHtml = ({ html, className = "" }) => {
  const clean = useMemo(() => normalizeRichHtml(html || ""), [html]);

  return (
    <div
      className={`rich-html prose prose-slate max-w-none prose-headings:font-display prose-a:text-accent ${className}`}
      dangerouslySetInnerHTML={{ __html: clean || "<p>No content yet.</p>" }}
    />
  );
};

export default RichHtml;
