export const DAYS_OF_WEEK = [
  "ПОНЕДЕЛЬНИК",
  "ВТОРНИК",
  "СРЕДА",
  "ЧЕТВЕРГ",
  "ПЯТНИЦА",
  "СУББОТА",
  "ВОСКРЕСЕНЬЕ",
];
const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
export const dayOptions = Array.from(
  { length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) },
  (_, i) => ({ value: i + 1, label: String(i + 1) })
);
export const MONTH_OPTIONS = [
  "Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август",
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
].map((label, value) => ({ value, label }));

export const YEAR_OPTIONS = [2024, 2025, 2026, 2027].map((y) => ({
  value: y,
  label: String(y),
}));
