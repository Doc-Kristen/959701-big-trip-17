import { createElement } from '../render.js';
import { createFilterTemplate } from './template/filter-template.js';

// Фильтры

export default class NewFiltersView {
  getTemplate() {
    return createFilterTemplate();
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
