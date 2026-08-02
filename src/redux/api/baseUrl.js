const url =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_API_URL?.replace(/\/$/, "")) ||
  "http://localhost:3050";

export default url;
