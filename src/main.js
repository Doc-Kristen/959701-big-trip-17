import './model/point-model';
import FilterPresenter from './presenter/filter-presenter.js';
import PagePresenter from './presenter/page-presenter.js';
import PointModel from './model/point-model';
import OfferModel from './model/offer-model';
import DestinationModel from './model/destination-model';
import FilterModel from './model/filter-model';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const controlsFiltersElement = document.querySelector('.trip-controls__filters');

const pointModel = new PointModel();
const offerModel = new OfferModel();
const destinationModel = new DestinationModel();
const filterModel = new FilterModel();

const pagePresenter = new PagePresenter(pointModel, offerModel, destinationModel, tripEventsElement, filterModel);
const filterPresenter = new FilterPresenter(controlsFiltersElement, filterModel, pointModel);

filterPresenter.init();
pagePresenter.init();

