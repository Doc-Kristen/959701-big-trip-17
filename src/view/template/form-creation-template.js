import he from 'he';
import { humanizePointDueDate } from '../../utils.js';
import { PointType } from '../../const.js';

// Форма создания точки

const renderPointTypes = (types, checkedType) => Object.values(types).map((type) => {
  const checked = type === checkedType ? 'checked' : '';

  return `<div class='event__type-item'>
    <input id='event-type-${type}-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value=${type} ${checked}>
    <label class='event__type-label  event__type-label--${type}' for='event-type-${type}-1'>${type.charAt(0).toUpperCase() + type.slice(1)}</label>
  </div>`;
}).join('');

const createPointTypesTemplate = (checkedType, isDisabled) => (
  `<div class='event__type-wrapper'>
    <label class='event__type  event__type-btn' for='event-type-toggle-1'>
      <span class='visually-hidden'>Choose event type</span>
      <img class='event__type-icon' width='17' height='17' src='img/icons/${checkedType}.png' alt='Event type icon'>
    </label>
    <input ${isDisabled ? 'disabled' : ''} class='event__type-toggle  visually-hidden' id='event-type-toggle-1' type='checkbox'>
    <div class='event__type-list'>
      <fieldset class='event__type-group'>
        <legend class='visually-hidden'>Event type</legend>
        ${renderPointTypes(PointType, checkedType, isDisabled)}
      </fieldset>
    </div>
  </div>`
);

const renderSelectedDestinations = (allDestinations) => allDestinations.map((destination) => (
  `<option value=${destination.name}></option>`
)).join('');

const createDestinationsTemplate = (type, destination, allDestinations, isDisabled) => {
  const destinationName = destination.name ? destination.name : '';
  return `<div class='event__field-group  event__field-group--destination'>
    <label class='event__label  event__type-output' for='event-destination-1'>
      ${type}
    </label>
    <input ${isDisabled ? 'disabled' : ''} class='event__input  event__input--destination' id='event-destination-1' type='text' name='event-destination' list='destination-list-1' autocomplete='off' required value=${he.encode(destinationName)}>
    <datalist id='destination-list-1'>
      ${renderSelectedDestinations(allDestinations)}
    </datalist>
  </div>`;
};

const renderOffers = (checkedType, allOffers, checkedOffers, isDisabled) => {
  const pointTypeOffer = allOffers.find((offer) => offer.type === checkedType);

  return pointTypeOffer.offers.map((offer) => {
    const checked = checkedOffers.includes(offer.id) ? 'checked' : '';

    return `<div class='event__offer-selector'>
      <input  ${isDisabled ? 'disabled' : ''} class='event__offer-checkbox  visually-hidden' id='event-offer-luggage-${offer.id}' type='checkbox' name='event-offer-luggage' data-offer-id=${offer.id} ${checked}>
      <label class='event__offer-label' for='event-offer-luggage-${offer.id}'>
        <span class='event__offer-title'>${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class='event__offer-price'>${offer.price}</span>
      </label>
    </div>`;
  }).join('');
};

const createOffersTemplate = (checkedType, allOffers, checkedOffers, isDisabled) => {
  const pointTypeOffer = allOffers.find((offer) => offer.type === checkedType);

  return pointTypeOffer.offers.length !== 0 ?
    `<section class='event__section  event__section--offers'>
      <h3 class='event__section-title  event__section-title--offers'>Offers</h3>
      <div class='event__available-offers'>
        ${renderOffers(checkedType, allOffers, checkedOffers, isDisabled)}
      </div>
    </section>` : '';
};

const renderPhotos = (allDestinations, checkedDestination) => {
  const pointCityDestination = allDestinations.find((destination) => destination.name === checkedDestination.name);

  return pointCityDestination.pictures.map((picture) => `<img class="event__photo" src=${picture.src} alt=${picture.description}>`).join('');
};

const createDestinationTemplate = (allDestinations, checkedDestination) => {

  const pointCityDestination = allDestinations.find((destination) => destination.name === checkedDestination.name);
  if(checkedDestination.name) {
    return pointCityDestination.description !== '' ?
      `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointCityDestination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${renderPhotos(allDestinations, checkedDestination)}
        </div>
      </div>
    </section>` :
      '';
  }
  return '';
};

const createNewFormTemplate = (data, allOffers, allDestinations) => {

  const {dateFrom, dateTo, checkedType, checkedDestination, checkedOffers, newPrice, isDisabled, isSaving} = data;
  const typesTemplate = createPointTypesTemplate(checkedType, isDisabled);
  const destinationsTemplate = createDestinationsTemplate(checkedType, checkedDestination, allDestinations, isDisabled);
  const offersTemplate = createOffersTemplate(checkedType, allOffers, checkedOffers, isDisabled);
  const destinationTemplate = createDestinationTemplate(allDestinations, checkedDestination);

  const dateStart = dateFrom !== null
    ? humanizePointDueDate(dateFrom)
    : '';
  const dateEnd = dateTo !== null
    ? humanizePointDueDate(dateTo)
    : '';

  return  (
    `<li class='trip-events__item'>
      <form class='event event--edit' action='#' method='post'>
        <header class='event__header'>
          ${typesTemplate}
          ${destinationsTemplate}
          <div class='event__field-group  event__field-group--time'>
            <label class='visually-hidden' for='event-start-time-1'>From</label>
            <input ${isDisabled ? 'disabled' : ''} class='event__input  event__input--time' id='event-start-time-1' type='text' name='event-start-time' value='${dateStart}'>
            &mdash;
            <label class='visually-hidden' for='event-end-time-1'>To</label>
            <input ${isDisabled ? 'disabled' : ''} class='event__input  event__input--time' id='event-end-time-1' type='text' name='event-end-time' value='${dateEnd}'>
          </div>
          <div class='event__field-group  event__field-group--price'>
            <label class='event__label' for='event-price-1'>
              <span class='visually-hidden'>Price</span>
              &euro;
            </label>
            <input ${isDisabled ? 'disabled' : ''} class='event__input  event__input--price' id='event-price-1' type='number' name='event-price' value='${newPrice}' required>
          </div>
          <button class='event__save-btn  btn  btn--blue' type='submit' ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type='reset' ${isDisabled ? 'disabled' : ''}>Cancel</button>
        </header>
        <section class='event__details'>
          ${offersTemplate}
          ${destinationTemplate}
        </section>
      </form>
    </li>`
  );
};

export { createNewFormTemplate };
