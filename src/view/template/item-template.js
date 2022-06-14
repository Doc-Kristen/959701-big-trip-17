import { getDifferenceTime, humanizeDueDateDayMonth, humanizeDueDateHourMinute } from '../../utils.js';

const findSelectedOffers = (selectedTypeOffer, allOffers) => {
  if (selectedTypeOffer === undefined) { return ''; }
  const allOffersOfSelectedType = allOffers.find((offer) => offer.type === selectedTypeOffer).offers;
  return allOffersOfSelectedType;
};

const renderSelectedOffers = (type, offersList, offers) => {

  const currentOffers = findSelectedOffers(type, offersList);
  return currentOffers.map((offer) => {

    const selectedOffer = offers.includes(offer.id) ? `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </li>`.trim() : '';
    return selectedOffer;
  }).join('');
};

const createItemTemplate = (point, allOffers) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite = false,
    offers,
    type
  } = point;
  const dateStart = dateFrom !== null
    ? humanizeDueDateHourMinute(dateFrom)
    : '';
  const dateEnd = dateTo !== null
    ? humanizeDueDateHourMinute(dateTo)
    : '';
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return (`<li class="trip-events__item">
<div class="event">
  <time class="event__date" datetime=${dateFrom}>${humanizeDueDateDayMonth(dateFrom)}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type} ${destination.name}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime=${dateFrom}>${dateStart}</time>
      &mdash;
      <time class="event__end-time" datetime=${dateTo}>${dateEnd}</time>
    </p>
    <p class="event__duration">${getDifferenceTime(dateFrom, dateTo)}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
  ${renderSelectedOffers(type, allOffers, offers)}
  </ul>
  <button class="event__favorite-btn event__favorite-btn ${favoriteClassName}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`);
};

export { createItemTemplate };
