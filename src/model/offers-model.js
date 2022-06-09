import Observable from '../framework/observable.js';
import { RenderPosition, render } from '../framework/render.js';
import { UpdateType } from '../const.js';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #errorComponent = null;
  #containerElement = null;
  #offers = [];

  constructor(offersApiService, errorComponent, containerElement) {
    super();
    this.#offersApiService = offersApiService;
    this.#errorComponent = errorComponent;
    this.#containerElement = containerElement;

  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch (err) {
      this.#offers = [];
      render(this.#errorComponent, this.#containerElement, RenderPosition.AFTERBEGIN);
      throw new Error('Can\'t get offers');
    }
    this._notify(UpdateType.INIT);
  };
}
