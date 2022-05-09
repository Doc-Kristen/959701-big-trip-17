import dayjs from 'dayjs';

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

const humanizeTaskDueDate = (dueDate) => {
  if (dueDate === null) {
    return '';
  }
  return dayjs(dueDate).format('D MMMM');
};

// Расчет времени между датами

const getDifference = (date1, date2) => {
  const totalMinutes = Math.abs(dayjs(date1).diff(dayjs(date2), 'm'));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = hours % 60;
  return hours === 0 ? `${minutes}M` : `${hours}H ${minutes}M`;
};

// Поиск массива оффера по подходящему типу

const findSelectedOffers = (selectedTypeOffer, allOffers) => {
  if (selectedTypeOffer === undefined) { return []; }
  const allOffersOfSelectedType = allOffers.find((offer) => offer.type === selectedTypeOffer).offers;
  return allOffersOfSelectedType;
};

export { getRandomArrayPart, getArrayRandomElement, humanizeTaskDueDate, getRandomInteger, getDifference, findSelectedOffers };
