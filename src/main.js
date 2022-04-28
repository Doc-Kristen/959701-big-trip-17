import PagePresenter from './presenter/page-presenter.js';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pagePresenter = new PagePresenter();

pagePresenter.init(tripMainElement, controlsFiltersElement, tripEventsElement);
