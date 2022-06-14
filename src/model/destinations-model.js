import { render, RenderPosition } from '../framework/render';
import Observable from '../framework/observable';

export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #errorComponent = null;
  #containerElement = null;
  #destinations = [];

  constructor(destinationsApiService, errorComponent, containerElement) {
    super();
    this.#destinationsApiService = destinationsApiService;
    this.#errorComponent = errorComponent;
    this.#containerElement = containerElement;
    this.init();
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch (err) {
      this.#destinations = [];
      render(this.#errorComponent, this.#containerElement, RenderPosition.AFTERBEGIN);
      throw new Error('Can\'t get destinations');
    }
  };
}
