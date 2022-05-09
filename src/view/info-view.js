import {createElement} from '../render.js';
import { createInfoTemplate } from './template/info-template.js';

export default class NewTripInfoView {
  #element;
  getTemplate() {
    return createInfoTemplate();
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.element = null;
  }
}
