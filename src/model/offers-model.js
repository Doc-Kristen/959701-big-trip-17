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

// export default class OfferModel extends Observable {
//   #tasksApiService = null;
//   #offers = [];

//   constructor(tasksApiService) {
//     super();
//     this.#tasksApiService = tasksApiService;

//   }

//   get offers() {
//     console.log('сработал offers', this.#offers );
//     return this.#offers;
//   }

//   init = async () => {
//     try {
//       const tasks = await this.#tasksApiService.offers;
//       this.#offers = tasks;
//       console.log('сработал init',this.#offers);
//     } catch(err) {
//       this.#offers = [];
//     }
//     this._notify(UpdateType.INIT);
//   };
// }
