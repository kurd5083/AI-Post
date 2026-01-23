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
