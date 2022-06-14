import { FilterType } from './const';
import { TimeInMs, TimeValue } from './const';
import dayjs from 'dayjs';

const nowDate = new Date();

// Расчет времени между датами

const getDifferenceTime = (date1, date2) => {
  let differenceTime = '';
  const difference = (new Date(date2)) - (new Date(date1));
  const day = Math.floor(difference / (TimeInMs.SECOND * TimeValue.SECONDS_PER_MINUTE * TimeValue.MINUTES_PER_HOUR * TimeValue.HOURS_PER_DAY));
  const hour = Math.floor((difference / TimeInMs.SECOND / TimeValue.SECONDS_PER_MINUTE / TimeValue.MINUTES_PER_HOUR) % TimeValue.HOURS_PER_DAY);
  const min = Math.floor((difference / TimeInMs.SECOND / TimeValue.SECONDS_PER_MINUTE) % TimeValue.MINUTES_PER_HOUR);
  if (difference < TimeInMs.HOUR) {
    differenceTime = `${min}M`;
  } else if (difference >= TimeInMs.HOUR && difference < TimeInMs.DAY) {
    differenceTime = `${hour}H ${min}M`;
  } else {
    differenceTime = `${day}D ${hour}H ${min}M`;
  }
  return differenceTime;
};

// Изменение формата даты

const humanizeDueDateFullFormat = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');

const humanizeDueDateDayMonth = (dueDate) => dueDate ? dayjs(dueDate).format('D MMMM') : '';

const humanizeDueDateHourMinute = (dueDate) => dueDate ? dayjs(dueDate).format('HH:mm') : '';

// Сортировка

const getWeightForStartDate = (dateA, dateB) => dateA - dateB;

const getWeightForTimeDown = (timeA, timeB) => timeB - timeA;

const getWeightForPriceDown = (priceA, priceB) => priceB - priceA;

const sortTimeDown = (pointA, pointB) => {
  const durationTimePointA = dayjs(pointA.dateTo).diff(pointA.dateFrom);
  const durationTimePointB = dayjs(pointB.dateTo).diff(pointB.dateFrom);

  return getWeightForTimeDown(durationTimePointA, durationTimePointB);
};

const sortDayUp = (pointA, pointB) => getWeightForStartDate(dayjs(pointA.dateFrom), dayjs(pointB.dateFrom));

const sortPriceDown = (pointA, pointB) => getWeightForPriceDown(pointA.basePrice, pointB.basePrice);

// Фильтрация

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom >= nowDate || point.dateFrom < nowDate && point.dateTo > nowDate),
  [FilterType.PAST]: (points) => points.filter((point) => nowDate > point.dateTo || point.dateFrom < nowDate && point.dateTo > nowDate),
};

export { filter, nowDate, getDifferenceTime, humanizeDueDateFullFormat, humanizeDueDateDayMonth, humanizeDueDateHourMinute, sortTimeDown, sortDayUp, sortPriceDown };
