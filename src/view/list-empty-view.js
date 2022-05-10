import { createElement } from '../render.js';
import { createEmptyTemplate } from './template/list-empty.js';

// Фильтры

export default class NewEmptyView {
  #element = null;

  get template() {
    return createEmptyTemplate();
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
