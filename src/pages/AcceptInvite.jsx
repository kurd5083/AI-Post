import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useNotificationStore } from "@/store/notificationStore";
import { useAcceptInvite } from "@/lib/channels/my-team/useAcceptInvite";

const AcceptInvite = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();

  const { mutate: accept, isLoading } = useAcceptInvite();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      accept( code, {
          onSuccess: (data) => {
            addNotification(data.message || "Приглашение успешно принято", "success");
            navigate("/");
          },
          onError: (err) => {
            addNotification(err.message || "Ошибка при принятии приглашения", "error");
            navigate("/");
          },
        }
      );
    }
  }, [searchParams, accept, addNotification, navigate]);

  return (
    <div>
      {isLoading ? "Обрабатываем приглашение..." : "Приглашение"}
    </div>
  );
};

export default AcceptInvite;
