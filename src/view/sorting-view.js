import AbstractView from '../framework/view/abstract-view.js';
import { createSortTemplate } from './template/sorting-template.js';

// Сортировка

export default class SortingView extends AbstractView {

  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };
}
