import AbstractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from './template/filter-template.js';

// Фильтры

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (!evt.target.classList.contains('trip-filters__filter-label')) {
      return;
    }
    const isFilterDisabled = evt.target.parentNode.querySelector('.trip-filters__filter-input').disabled;
    if (isFilterDisabled) {
      return;
    }
    this._callback.filterTypeChange(evt.target.parentNode.querySelector('.trip-filters__filter-input').value);
  };
}

