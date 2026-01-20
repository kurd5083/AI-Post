const normalizeUrl = (url) => {
  if (!url) return ""; // возвращаем пустую строку, если url null/undefined
  if (url instanceof File) return URL.createObjectURL(url);
  if (typeof url === "string" && url.startsWith("http")) return url;
  
  // Убираем начальный слеш, если есть
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
  
  // Если путь уже содержит /api/v1/uploads/, используем его как есть
  if (cleanUrl.includes("/api/v1/uploads/")) {
    return `http://77.37.65.40:3000/${cleanUrl}`;
  }
  
  // Если путь содержит /uploads/, заменяем на /api/v1/uploads/
  if (cleanUrl.includes("/uploads/")) {
    const correctedUrl = cleanUrl.replace("/uploads/", "/api/v1/uploads/");
    return `http://77.37.65.40:3000/${correctedUrl}`;
  }
  
  // Если это просто имя файла (например, AI_20260120_063923_img_1.jpg), добавляем префикс /api/v1/uploads/
  return `http://77.37.65.40:3000/api/v1/uploads/${cleanUrl}`;
};
export default normalizeUrl;
