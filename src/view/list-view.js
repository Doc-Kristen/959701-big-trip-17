import { createElement } from '../render.js';
import { createListTemplate } from './template/list-template.js';

// Фильтры

export default class NewListView {
  #element = null;

  get template() {
    return createListTemplate();
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
