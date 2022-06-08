import './model/point-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PagePresenter from './presenter/page-presenter.js';
import PointsModel from './model/point-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model.js';
import PointsApiService from './services/points-api-service.js';
import OffersApiService from './services/offers-api-service.js';
import DestinationsApiService from './services/destinations-api-service.js';

const AUTHORIZATION = 'Basic bD5kbA79jl12h9f7fgfhhjgkh';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const controlsFiltersElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

const pagePresenter = new PagePresenter(pointsModel, offersModel, destinationsModel, tripEventsElement, filterModel);
const filterPresenter = new FilterPresenter(controlsFiltersElement, filterModel, pointsModel);

filterPresenter.init();
pagePresenter.init();
pointsModel.init();
offersModel.init();


