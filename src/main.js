import './model/point-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PagePresenter from './presenter/page-presenter.js';
import PointsModel from './model/point-model';
import FilterModel from './model/filter-model.js';
import ButtonCreateEventView from './view/button-new-event-view.js';
import PointsApiService from './services/points-api-service.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic bD5kbA79jl12h9f7fgfhhjgkh';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

const pagePresenter = new PagePresenter(pointsModel, tripEventsElement, filterModel);
const filterPresenter = new FilterPresenter(controlsFiltersElement, filterModel, pointsModel);
const newButtonCreateEventView = new ButtonCreateEventView();

const handleNewPointButtonClose = () => {
  newButtonCreateEventView.element.disabled = false;
};
const handleNewPointButtonClick = () => {
  pagePresenter.createNewEvent(handleNewPointButtonClose);
  newButtonCreateEventView.element.disabled = true;
};

filterPresenter.init();

pagePresenter.init();
pointsModel.init().then(() => {

  render(newButtonCreateEventView, tripMainElement);
  newButtonCreateEventView.setAddEventClickHandler(handleNewPointButtonClick);
});
