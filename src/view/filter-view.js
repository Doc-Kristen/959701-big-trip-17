import { createElement } from '../render.js';
import { createFilterTemplate } from './template/filter-template.js';

// Фильтры

export default class NewFiltersView {
  #element = null;

  get template() {
    return createFilterTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
