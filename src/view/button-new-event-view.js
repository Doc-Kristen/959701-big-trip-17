import AbstractView from '../framework/view/abstract-view';
import { createButtonNewEventTemplate } from './template/button-new-event';


export default class NewButtonCreateEventView extends AbstractView {

  get template() {
    return createButtonNewEventTemplate();
  }

  setAddEventClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#addEventClickHandler);
  };

  #addEventClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
