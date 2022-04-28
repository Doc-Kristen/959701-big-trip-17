import { createElement } from '../render.js';
import { createSortTemplate } from './template/sorting-template.js';

// Сортировка

export default class NewSortingView {
  getTemplate() {
    return createSortTemplate();
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
