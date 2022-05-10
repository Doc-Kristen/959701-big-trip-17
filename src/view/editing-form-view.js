import AbstractView from '../framework/view/abstract-view.js';
import { createFormTemplate } from './template/editing-form-template.js';

// Форма редактирования

export default class NewEditingFormView extends AbstractView {
  #task = null;
  #offers = null;

  constructor(task, offers) {
    super();
    this.#task = task;
    this.#offers = offers;
  }

  get template() {
    return createFormTemplate(this.#task, this.#offers);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };

  setCloseClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

}
