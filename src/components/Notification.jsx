import styled, { keyframes } from "styled-components";
import { CheckCircle2, XCircle, Info, RefreshCw, Trash2 } from "lucide-react";
import { useNotificationStore } from "../store/notificationStore";
import { useEffect } from "react";

const Notification = () => {
  const { notifications, removeNotification } = useNotificationStore();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={20} />;
      case "error":
        return <XCircle size={20} />;
      case "update":
        return <RefreshCw size={20} />;
      case "delete":
        return <Trash2 size={20} />;
      case "info":
      default:
        return <Info size={20} />;
    }
  };

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
          <IconWrapper $type={n.type}>{getIcon(n.type)}</IconWrapper>
          <Message>{n.message}</Message>
          <CloseButton onClick={() => removeNotification(n.id)}>
            <XCircle size={18} />
          </CloseButton>
        </NotificationItem>
      ))}
    </Container>
  );
};

// Анимация появления
const slideFade = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
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
  padding: 14px 20px;
  min-width: 300px;
  border-radius: 12px;
  background-color: ${({ $type }) => {
    switch ($type) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#F44336";
      case "update":
        return "#FFB74D";
      case "delete":
        return "#E57373";
      case "info":
      default:
        return "#2196F3";
    }
  }};
  color: #fff;
  animation: ${slideFade} 0.35s ease forwards;
  box-shadow: 0 8px 16px rgba(0,0,0,0.25);
  position: relative;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255,255,255,0.2);
  padding: 8px;
  border-radius: 50%;
  svg {
    stroke: #fff;
    stroke-width: 2;
  }
`;

const Message = styled.div`
  font-weight: 600;
  flex: 1;
  font-size: 15px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  svg {
    stroke: #fff;
    stroke-width: 2;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  &:hover svg {
    opacity: 1;
  }
`;

export default Notification;