import { useMutation } from '@tanstack/react-query';

const useTelegramAuth = () => {
  return useMutation(async (userData) => {
    const response = await fetch("/api/v1/users/auth/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка авторизации");
    }

    return response.json();
  });
};
export default useTelegramAuth