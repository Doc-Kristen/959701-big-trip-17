import { createElement } from '../render.js';
import { createListTemplate } from './template/list-template.js';

// Фильтры

export default class NewListView {
  #element;

  getTemplate() {
    return createListTemplate();
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
