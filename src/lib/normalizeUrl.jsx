const normalizeUrl = (url) => {
  if (!url) return "";
  if (url instanceof File) return URL.createObjectURL(url);

  if (typeof url === "string" && url.startsWith("http")) {
    return url;
  }

  const baseUrl = "http://77.37.65.40:3000";

  let path = url.startsWith("/") ? url.slice(1) : url;

  if (!path.startsWith("uploads/")) {
    path = `uploads/${path}`;
  }

  return `${baseUrl}/${path}`;
};

export default normalizeUrl;
