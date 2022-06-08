import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch (err) {
      this.#offers = [];
      throw new Error('Can\'t get offers');
    }
    this._notify(UpdateType.INIT);
  };
}
