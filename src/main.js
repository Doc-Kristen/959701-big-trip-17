import './model/point-model';
import PagePresenter from './presenter/page-presenter.js';
import PointModel from './model/point-model';
import OfferModel from './model/offer-model';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pagePresenter = new PagePresenter();
const pointModel = new PointModel();
const offerModel = new OfferModel();

pagePresenter.init(tripMainElement, controlsFiltersElement, tripEventsElement, pointModel.getTasks(), pointModel.getTasks(), offerModel.getOffers());
