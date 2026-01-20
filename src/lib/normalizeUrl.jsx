const normalizeUrl = (url) => {
  if (!url) return ""; // возвращаем пустую строку, если url null/undefined
  if (url instanceof File) return URL.createObjectURL(url);
  if (typeof url === "string" && url.startsWith("http")) return url;
  
  return `http://77.37.65.40:3000/${url.startsWith("/") ? url.slice(1) : url}`;
};
export default normalizeUrl;
