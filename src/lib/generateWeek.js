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

export const formatRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dayStart = startDate.getDate();
  const dayEnd = endDate.getDate();

  const monthNames = ["янв", "фев", "мар", "апр", "май", "июн", 
                      "июл", "авг", "сен", "окт", "ноя", "дек"];
  const month = monthNames[startDate.getMonth()];
  const year = startDate.getFullYear();

  return `${dayStart}–${dayEnd} ${month} ${year}`;
};
