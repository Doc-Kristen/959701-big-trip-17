import AbstractView from '../framework/view/abstract-view.js';
import { createItemTemplate } from './template/item-template.js';

// Элемент списка точек маршрута

export default class NewItemView extends AbstractView {
  #task = null;
  #offers = null;

  constructor(task, offers) {
    super();
    this.#task = task;
    this.#offers = offers;
  }

  get template() {
    return createItemTemplate(this.#task, this.#offers);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };


  setChooseFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#chooseFavoriteClickHandler);
  };

  #chooseFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

}
