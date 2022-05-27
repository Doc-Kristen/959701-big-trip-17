import { allDestinations } from '../mock/trip-mock.js';

export default class DestinationModel {

  #allDestinations = allDestinations;

  get allDestinations() {
    return this.#allDestinations;
  }
}

export { allDestinations };
