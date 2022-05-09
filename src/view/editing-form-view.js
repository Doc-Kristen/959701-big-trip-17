import { createElement } from '../render.js';
import { createFormTemplate } from './template/editing-form-template.js';

// Форма редактирования

export default class NewEditingFormView {
  #task;
  #offers;
  #element;

  constructor(task, offers) {
    this.#task = task;
    this.#offers = offers;
  }

  getTemplate() {
    return createFormTemplate(this.#task, this.#offers);
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
