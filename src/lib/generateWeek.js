export const generateWeek = (date) => {
  const monday = new Date(date);
  const diff = date.getDay() === 0 ? -6 : 1 - date.getDay();
  monday.setDate(date.getDate() + diff);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

export const formatRange = (start, end) =>
  `${new Date(start).toLocaleDateString("ru-RU")} – ${new Date(end).toLocaleDateString("ru-RU")}`;
