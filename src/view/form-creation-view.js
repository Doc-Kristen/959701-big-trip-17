import AbstractView from '../framework/view/abstract-view.js';
import { createNewFormTemplate } from './template/form-creation-template.js';

// Форма создания

export default class NewFormView extends AbstractView {

  get template() {
    return createNewFormTemplate();
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
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
