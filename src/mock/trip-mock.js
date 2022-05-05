import { getRandomInteger, getRandomArrayPart, getArrayRandomElement } from './util';
import { fishDescriptions, cities, types } from './const-mock';
import dayjs from 'dayjs';

const MAX_ID_POINT = 10;
const minNumberForRandom = -7;
const maxNumberForRandom = 7;

// Получить массив с офферами

const getFishOffers = () => ([
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Infotainment system',
        price: 50
      },
      {
        id: 2,
        title: 'Order meal',
        price: 100
      },
      {
        id: 3,
        title: 'Choose seats',
        price: 190
      }
    ]
  },
  {
    type: 'train',
    offers:
      [{
        id: 1,
        title: 'Infotainment system',
        price: 50
      },
      {
        id: 2,
        title: 'Order a breakfast',
        price: 80
      },
      {
        id: 3,
        title: 'Wake up at a certain time',
        price: 140
      }
      ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 3,
        title: 'Upgrade to comfort class',
        price: 170
      },
      {
        id: 4,
        title: 'Upgrade to business class',
        price: 150
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'With automatic transmission',
        price: 110
      },
      {
        id: 2,
        title: 'With air conditioning',
        price: 180
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 3,
        title: 'Upgrade to comfort class',
        price: 170
      },
      {
        id: 4,
        title: 'Upgrade to business class',
        price: 150
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Choose the time of check-in',
        price: 70
      },
      {
        id: 3,
        title: 'Add breakfast',
        price: 110
      },
      {
        id: 5,
        title: 'Order a meal from the restaurant',
        price: 30
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 3,
        title: 'Add breakfast',
        price: 110
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 5,
        title: 'Order a meal from the restaurant',
        price: 30
      }
    ]
  },
]);

// Генерация места и его описания

const generatetDestination = () => ({
  description: getRandomArrayPart(fishDescriptions),
  name: getArrayRandomElement(cities),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger()}`,
      description: getRandomArrayPart(fishDescriptions),
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger()}`,
      description: getRandomArrayPart(fishDescriptions),
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger()}`,
      description: getRandomArrayPart(fishDescriptions),
    }
  ]
});

// Поиск оффера по выбранному типу

const findOffes = (typeOffer, ArrayOffers) => {
  if (typeOffer === undefined) { return []; }
  return ArrayOffers.find((offer) => offer.type === typeOffer).offers;

};

// Генерация точки маршрута

const generatePoint = () => {
  const fishOffers = getFishOffers();
  const typeOffer = types[getRandomInteger(0, types.length)];
  const findedAllOffes = findOffes(typeOffer, fishOffers);
  const startDate = getRandomInteger(minNumberForRandom, maxNumberForRandom);
  const endDate = startDate + getRandomInteger(minNumberForRandom, maxNumberForRandom);
  const maxNumber = Math.max(startDate, endDate);
  const minNumber = Math.min(startDate, endDate);

  return {
    'base_price': getRandomInteger(),
    'date_from': dayjs().add(minNumber, 'day').toDate(),
    'date_to': dayjs().add(maxNumber, 'day').toDate(),
    'destination': generatetDestination(),
    'id': getRandomInteger(0, MAX_ID_POINT),
    'is_favorite': Boolean(getRandomInteger(0, 1)),
    'offers': getRandomArrayPart(findedAllOffes),
    'type': typeOffer,
  };
};

export { generatePoint, getFishOffers };

