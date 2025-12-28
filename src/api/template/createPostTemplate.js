import apiClient from "@/api/apiClient";

export const createPostTemplate = async (templateData) => {
    console.log(templateData)
  const response = await apiClient.post("/post-templates", {
  "category": "MARKETING",
  "title": "Объявление о продукте",
  "content": "🚀 Представляем новый продукт!\n\n✨ Основные преимущества:\n\n- Быстро\n- Удобно\n- Надёжно",
  "hashtags": ["#продукт", "#анонс", "#маркетинг"],
  "rating": 4.8,
  "isActive": true
});
  return response.data;
};
