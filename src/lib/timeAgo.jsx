const timeAgo = (isoString) => {
  const now = new Date();
  const date = new Date(isoString);
  const diff = (now - date) / 1000; // разница в секундах

  if (diff < 60) return `${Math.floor(diff)} сек назад`;
  if (diff < 3600) return `${Math.floor(diff / 60)} мин назад`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч назад`;
  return `${Math.floor(diff / 86400)} дн назад`;
};

export default timeAgo

