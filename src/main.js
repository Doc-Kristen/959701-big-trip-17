import './model/point-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PagePresenter from './presenter/page-presenter.js';
import PointsModel from './model/point-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model.js';
import ButtonCreateEventView from './view/button-new-event-view.js';
import PointsApiService from './services/points-api-service.js';
import OffersApiService from './services/offers-api-service.js';
import DestinationsApiService from './services/destinations-api-service.js';
import ErrorView from './view/error-view.js';
import { ErrorTextType } from './const.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic bD5kbA79jl12h9f7fgfhhjgkh';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION), new ErrorView(ErrorTextType.POINTS), tripEventsElement);
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION), new ErrorView(ErrorTextType.OFFERS), tripEventsElement);
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION), new ErrorView(ErrorTextType.DESTINATIONS), tripEventsElement);

const filterModel = new FilterModel();

const pagePresenter = new PagePresenter(pointsModel, offersModel, destinationsModel, tripEventsElement, filterModel);
const filterPresenter = new FilterPresenter(controlsFiltersElement, filterModel, pointsModel);
const newButtonCreateEventView = new ButtonCreateEventView();

const handleNewPointButtonClose = () => {
  newButtonCreateEventView.element.disabled = false;
};
const handleNewPointButtonClick = () => {
  pagePresenter.createNewEvent(handleNewPointButtonClose);
  newButtonCreateEventView.element.disabled = true;
};

pagePresenter.init();
offersModel.init().finally(() => {
  filterPresenter.init();
  pointsModel.init();
});

render(newButtonCreateEventView, tripMainElement);
newButtonCreateEventView.setAddEventClickHandler(handleNewPointButtonClick);
