import {createElement} from '../render.js';
import { createInfoTemplate } from './template/info-template.js';

export default class NewTripInfoView {
  #element = null;

  get template() {
    return createInfoTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.element = null;
  }
}
