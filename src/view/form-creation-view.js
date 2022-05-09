import { createElement } from '../render.js';
import { createNewFormTemplate } from './template/form-creation-template.js';

// Форма создания

export default class NewFormView {
  #element;

  getTemplate() {
    return createNewFormTemplate();
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
