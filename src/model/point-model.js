import { generatePoint } from '../mock/trip-mock.js';
import Observable from '../framework/observable.js';

const NUMBER_ROUTE_POINTS = 15;

const adaptData = (notAdaptedData) => notAdaptedData.map((point) => ({
  basePrice: point['base_price'],
  dateFrom: point['date_from'],
  dateTo: point['date_to'],
  destination: point['destination'],
  id: point['id'],
  isFavorite: point['is_favorite'],
  offers: point['offers'],
  type: point['type']
}));

export default class PointModel extends Observable {

  #notAdaptedData = Array.from({ length: NUMBER_ROUTE_POINTS }, generatePoint);

  #tasks = adaptData(this.#notAdaptedData);

  get tasks() {
    return this.#tasks;
  }

  updateTask = (updateType, update) => {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#tasks = [
      ...this.#tasks.slice(0, index),
      update,
      ...this.#tasks.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addTask = (updateType, update) => {
    this.#tasks = [
      update,
      ...this.#tasks,
    ];

    this._notify(updateType, update);
  };

  deleteTask = (updateType, update) => {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#tasks = [
      ...this.#tasks.slice(0, index),
      ...this.#tasks.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
