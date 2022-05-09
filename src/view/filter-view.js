import { createElement } from '../render.js';
import { createFilterTemplate } from './template/filter-template.js';

// Фильтры

export default class NewFiltersView {
  #element;

  getTemplate() {
    return createFilterTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
