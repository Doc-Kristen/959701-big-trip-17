import Observable from '../framework/observable.js';
import { getFishOffers } from '../mock/trip-mock.js';

export default class OfferModel extends Observable {
  #allOffer = getFishOffers();
  get offers() {
    return this.#allOffer;
  }
}
