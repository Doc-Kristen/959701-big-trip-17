
import AbstractView from '../framework/view/abstract-view.js';
import { createInfoTemplate } from './template/info-template.js';

export default class tripInfoView extends AbstractView {

  #points = null;
  #allOffers = null;

  constructor(points, allOffers) {
    super();
    this.#points = points;
    this.#allOffers = allOffers;
  }

  get template() {
    return createInfoTemplate(this.#points, this.#allOffers);
  }

}

