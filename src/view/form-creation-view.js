import { createElement } from '../render.js';
import { createNewFormTemplate } from './template/form-creation-template.js';

// Форма создания

export default class NewFormView {
  getTemplate() {
    return createNewFormTemplate();
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
