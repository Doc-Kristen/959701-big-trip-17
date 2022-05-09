import { createElement } from '../render.js';
import { createSortTemplate } from './template/sorting-template.js';

// Сортировка

export default class NewSortingView {
  #element = null;

  getTemplate() {
    return createSortTemplate();
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
