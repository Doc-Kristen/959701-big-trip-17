import { createElement } from '../render.js';
import { createItemTemplate } from './template/item-template.js';

// Элемент списка точек маршрута

export default class NewItemView {
  #task = null;
  #offers = null;

  constructor(task, offers) {
    this.#task = task;
    this.#offers = offers;
  }

  getTemplate() {
    return createItemTemplate(this.#task, this.#offers);
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
