import dayjs from 'dayjs';
import { TimeInMs } from '../const';
// Генерация случайного числа из диапазона

const getRandomInteger = (a = 0, b = 1000) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция, возвращающая значение элемента массива в рандомном порядке

const getArrayRandomElement = (arr) => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// Функция, для получения случайного фрагмента массива.

const getRandomArrayPart = (arr) => {
  const lastIndex = arr.length - 1;
  const a = getRandomInteger(0, lastIndex);
  const b = getRandomInteger(0, lastIndex);
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return arr.slice(lower, upper);
};

// Расчет времени между датами

const getDifferenceTime = (date1, date2) => {
  let differenceTime = '';
  const difference = (new Date(date2)) - (new Date(date1));
  const day = Math.floor(difference / (TimeInMs.SECOND * 60 * 60 * 24));
  const hour = Math.floor((difference / TimeInMs.SECOND / 60 / 60) % 24);
  const min = Math.floor((difference / TimeInMs.SECOND / 60) % 60);
  if (difference < TimeInMs.HOUR) {
    differenceTime = `${min}M`;
  } else if (difference >= TimeInMs.HOUR && difference < TimeInMs.DAY) {
    differenceTime = `${hour}H ${min}M`;
  } else {
    differenceTime = `${day}D ${hour}H ${min}M`;
  }
  return differenceTime;
};

// Поиск массива оффера по подходящему типу

const findSelectedOffers = (selectedTypeOffer, allOffers) => {
  if (selectedTypeOffer === undefined) { return []; }
  const allOffersOfSelectedType = allOffers.find((offer) => offer.type === selectedTypeOffer).offers;
  return allOffersOfSelectedType;
};

// Изменение формата даты

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');

const humanizeTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format('D MMMM') : '';

const isTaskExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

const isTaskRepeating = (repeating) => Object.values(repeating).some(Boolean);

const isTaskExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');

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

export { getRandomArrayPart, humanizePointDueDate, getArrayRandomElement, humanizeTaskDueDate, getRandomInteger, getDifferenceTime as getDifference, findSelectedOffers, isTaskExpired, isTaskRepeating, isTaskExpiringToday, sortDayUp, sortTimeDown, sortPriceDown };
