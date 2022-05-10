import { createElement } from '../render.js';
import { createFormTemplate } from './template/editing-form-template.js';

// Форма редактирования

export default class NewEditingFormView {
  #task = null;
  #offers = null;
  #element = null;

  constructor(task, offers) {
    this.#task = task;
    this.#offers = offers;
  }

  get template() {
    return createFormTemplate(this.#task, this.#offers);
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
