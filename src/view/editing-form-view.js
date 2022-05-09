import { createElement } from '../render.js';
import { createFormTemplate } from './template/editing-form-template.js';

// Форма редактирования

export default class NewEditingFormView {
  #task;
  #offers;

  constructor(task, offers) {
    this.#task = task;
    this.#offers = offers;
  }

  getTemplate() {
    return createFormTemplate(this.#task, this.#offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
