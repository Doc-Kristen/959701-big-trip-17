import { getFishOffers } from '../mock/trip-mock.js';

export default class OfferModel {
  #allOffer = getFishOffers();
  get offers() {
    return this.#allOffer;
  }
}
