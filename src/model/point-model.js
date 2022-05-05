import { generatePoint, getFishOffers } from '../mock/trip-mock.js';

const NUMBER_ROUTE_POINTS = 15;

export default class PointModel {

  offers = getFishOffers();

  tasks = Array.from({ length: NUMBER_ROUTE_POINTS }, generatePoint);

  getTasks = () => this.tasks.map((point) => ({
    basePrice: point['base_price'],
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    destination: point['destination'],
    id: point['id'],
    isFavorite: point['is_favorite'],
    offers: point['offers'],
    type: point['type']
  }));

}

