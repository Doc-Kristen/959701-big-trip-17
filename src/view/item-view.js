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

  get template() {
    return createItemTemplate(this.#task, this.#offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.template);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

// const NNN = new NewItemView();
// console.log(NNN.getElement());
