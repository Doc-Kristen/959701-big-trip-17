import { createElement } from '../render.js';
import { createFormTemplate } from './template/editing-form-template.js';

// Форма редактирования

export default class NewEditingFormView {
  getTemplate() {
    return createFormTemplate();
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
