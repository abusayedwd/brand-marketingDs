export const decodeHtmlEntities = (html = "") => {
  if (typeof window === "undefined") return String(html || "");
  let current = String(html || "");
  let prev = "";
  let guard = 0;
  while (current !== prev && guard < 5) {
    prev = current;
    const textarea = document.createElement("textarea");
    textarea.innerHTML = current;
    current = textarea.value;
    guard += 1;
  }
  return current;
};

export const normalizeRichHtml = (html = "") => {
  let value = decodeHtmlEntities(html).trim();
  if (!value) return "";
  if (/&lt;\/?[a-z]/i.test(value)) {
    value = decodeHtmlEntities(value);
  }
  value = value.replace(/<p>\s*<p>/gi, "<p>").replace(/<\/p>\s*<\/p>/gi, "</p>");
  return value;
};
