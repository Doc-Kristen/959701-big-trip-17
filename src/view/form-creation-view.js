import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createNewFormTemplate } from './template/form-creation-template.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

import 'flatpickr/dist/flatpickr.min.css';

// Форма создания точки маршрута

export default class FormOfcreationView extends AbstractStatefulView {

  #allOffers = null;
  #allDestinations = null;
  #datepicker = null;

  constructor(point, allOffers, allDestinations) {
    super();
    this._state = FormOfcreationView.parsePointToState(point);

    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;

    this.#setInnerHandlers();
  }

  get template() {
    return createNewFormTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  reset = (point) => {
    this.updateElement(
      FormOfcreationView.parsePointToState(point),
    );
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #setDateFromPicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
  };

  #setDateToPicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  };

  #dateFromChangeHandler = ([userDate]) => {
    const isFromAfterTo = userDate > dayjs(this._state.dateTo).toDate();
    this.updateElement({
      dateFrom: userDate,
      dateTo: isFromAfterTo ? userDate : this._state.dateTo,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #pointTypeClickHandler = (evt) => {
    if (!evt.target.classList.contains('event__type-label')) {
      return;
    }
    evt.preventDefault();
    this.updateElement({
      checkedType: evt.target.parentNode.querySelector('.event__type-input').value,
      checkedOffers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    if (this.#allDestinations.some((destination) => destination.name === evt.target.value)) {
      const selectedDestination = this.#allDestinations.find((destination) => destination.name === evt.target.value);

      this.updateElement({
        name: evt.target.value,
        checkedDestination: selectedDestination,
      });
    }
  };

  #offersToggleHandler = (evt) => {
    if (!evt.target.classList.contains('event__offer-checkbox')) {
      return;
    }

    const оffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .filter((el) => el.checked)
      .map((el) => Number(el.dataset.offerId));

    this._setState({
      checkedOffers: оffers,
    });
  };

  #basePriceInputHandler = (evt) => {
    evt.preventDefault();
    const reg = /\D+/g;
    this._setState({
      newPrice: evt.target.value.replace(reg, '')
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormOfcreationView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick();
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list')
      .addEventListener('click', this.#pointTypeClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers')
        .addEventListener('click', this.#offersToggleHandler);
    }
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#basePriceInputHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  };

  static parsePointToState = (point) => ({
    ...point,
    checkedType: point.type,
    checkedDestination: point.destination,
    checkedOffers: point.offers,
    newPrice: point.basePrice,
    isDisabled: false,
    isSaving: false
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    if (point.checkedType !== point.type) {
      point.type = point.checkedType;
    }
    if (point.checkedDestination !== point.destination) {
      point.destination = point.checkedDestination;
    }
    point.offers = point.checkedOffers;
    point.basePrice = point.newPrice;

    delete point.checkedType;
    delete point.checkedDestination;
    delete point.checkedOffers;
    delete point.newPrice;
    delete point.isDisabled;
    delete point.isSaving;

    return point;
  };
}
