import baseUrl from "../redux/api/baseUrl";

/** Always-available avatar when Cloudinary is missing and old /uploads files are gone. */
export const DEFAULT_AVATAR =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="64" fill="#0b1f17"/>
      <circle cx="64" cy="48" r="22" fill="#34d399"/>
      <path d="M28 108c6-26 22-38 36-38s30 12 36 38" fill="#34d399"/>
    </svg>`
  );

function resolveFallback(fallback) {
  if (!fallback) return DEFAULT_AVATAR;
  if (/^https?:\/\//i.test(fallback) || fallback.startsWith("data:")) return fallback;
  return DEFAULT_AVATAR;
}

/**
 * Cloudinary / absolute URL stays as-is.
 * Legacy `/uploads/...` files are no longer on the server, so use a fallback.
 */
export default function getMediaUrl(pathOrObj, fallback = DEFAULT_AVATAR) {
  const safeFallback = resolveFallback(fallback);
  const path =
    typeof pathOrObj === "object" && pathOrObj !== null
      ? pathOrObj.url || pathOrObj.path || ""
      : pathOrObj || "";

  if (!path) return safeFallback;
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  if (path.startsWith("/uploads/")) return safeFallback;

  const base = (baseUrl || "").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
