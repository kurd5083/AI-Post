import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthTelegram } from "@/lib/useAuthTelegram";

const Auth = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { mutate: telegramAuth } = useAuthTelegram();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const data = {
      id: params.get("id"),
      first_name: params.get("first_name"),
      last_name: params.get("last_name"),
      username: params.get("username"),
      photo_url: params.get("photo_url"),
      auth_date: params.get("auth_date"),
      hash: params.get("hash"),
    };

    telegramAuth(data, {
        onSuccess: () => navigate("https://ai-post-test-2.netlify.app/"),
    });
  }, [search, navigate, telegramAuth]);

  return <div>Авторизация через Telegram...</div>;
};

export default Auth;
