import styled, { keyframes } from "styled-components";
import { CheckCircle, XCircle, Info, RefreshCw, Trash2 } from "lucide-react";
import { useNotificationStore } from "../store/notificationStore";
import { useEffect } from "react";

const Notification = () => {
  const { notifications, removeNotification } = useNotificationStore();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle size={24} color="#fff" />;
      case "error":
        return <XCircle size={24} color="#fff" />;
      case "update":
        return <RefreshCw size={24} color="#fff" />;
      case "delete":
        return <Trash2 size={24} color="#fff" />;
      case "info":
      default:
        return <Info size={24} color="#fff" />;
    }
  };

  // Автоудаление уведомления через 5 секунд
  useEffect(() => {
    const timers = notifications.map((n) =>
      setTimeout(() => removeNotification(n.id), 5000)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [notifications, removeNotification]);

  return (
    <Container>
      {notifications.map((n) => (
        <NotificationItem key={n.id} $type={n.type}>
          <IconWrapper>{getIcon(n.type)}</IconWrapper>
          <Message>{n.message}</Message>
          <CloseButton onClick={() => removeNotification(n.id)}>
            <XCircle size={18} color="#fff" />
          </CloseButton>
        </NotificationItem>
      ))}
    </Container>
  );
};

const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Container = styled.div`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  min-width: 250px;
  border-radius: 8px;
  color: #fff;
  background-color: ${({ $type }) => {
    switch ($type) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#F44336";
      case "update":
        return "#FF9800";
      case "delete":
        return "#F44336"; 
      case "info":
      default:
        return "#2196F3";
    }
  }};
  animation: ${slideDown} 0.3s ease forwards;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Message = styled.div`
  font-weight: 600;
  flex: 1;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export default Notification;
