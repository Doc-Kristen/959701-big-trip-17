import { FilterType } from './const';

const nowDate = new Date();

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom >= nowDate || point.dateFrom < nowDate && point.dateTo > nowDate),
  [FilterType.PAST]: (points) => points.filter((point) => nowDate > point.dateTo || point.dateFrom < nowDate && point.dateTo > nowDate),
};

export { filter, nowDate };
