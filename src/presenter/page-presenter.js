import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../mock/util.js';
import { generateFilter } from '../mock/trip-mock.js';
import NewFiltersView from '../view/filter-view.js';
import NewSortingView from '../view/sorting-view.js';
import NewTripInfoView from '../view/info-view.js';
import NewListView from '../view/list-view.js';
import NewEmptyView from '../view/list-empty-view.js';
import NewButtonCreateEventView from '../view/button-new-event-view.js';
import EventPresenter from './event-presenter.js';
import FormEventPresenter from './new-event-presenter.js';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const filter = generateFilter();
export default class PagePresenter {
  #newTripInfoView = new NewTripInfoView();
  #newFiltersView = new NewFiltersView(filter);
  #newSortingView = new NewSortingView();
  #newListView = new NewListView();
  #newButtonCreateEventView = new NewButtonCreateEventView();
  #newEmptyView = new NewEmptyView();
  #pointModel = null;
  #newFormView = null;

  #taskPresenter = new Map();

  get tasks() {
    return this.#pointModel.tasks;
  }

  init = (pointModel, offers, destinations) => {
    this.#pointModel = [...pointModel];

    this.allOffersModel = offers;
    this.allDestinationsModel = destinations;


    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderNewSorting();
    this.#renderList();
    this.#renderButtonCreateEvent();
    this.#renderEvents(this.#pointModel, this.allOffersModel, this.#newListView.element, this.allDestinationsModel);
  };

  #renderNewEvent = (events, offers, container, destinations) => {
    this.#newFormView = new FormEventPresenter(events, offers, container, this.#handleTaskChange, this.#handleModeChange, destinations);
    this.#newFormView.init();
  };

  #renderNoEventConponent = () => {
    render(this.#newEmptyView, tripEventsElement);
  };

  #renderEvent = (events, offers, container, destinations) => {
    const taskPresenter = new EventPresenter(events, offers, container, this.#handleTaskChange, this.#handleModeChange, destinations);
    taskPresenter.init();
    this.#taskPresenter.set(events.id, taskPresenter);
  };

  #renderEvents = (events, offers, container, destinations) => {

    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        this.#renderEvent(events[i], offers, container, destinations);
      }
    } else {
      this.#renderNoEventConponent();
    }
  };

  #renderButtonCreateEvent = () => {
    render(this.#newButtonCreateEventView, tripMainElement);
    this.#newButtonCreateEventView.setAddEventClickHandler(()=> this.#renderNewEvent(this.#pointModel[0], this.allOffersModel, this.#newListView.element, this.allDestinationsModel));
  };

  #renderList = () => {
    render(this.#newListView, tripEventsElement);
  };

  #renderNewSorting = () => {
    render(this.#newSortingView, tripEventsElement);
  };

  #renderFilters = () => {
    render(this.#newFiltersView, controlsFiltersElement);
  };

  #renderTripInfo = () => {
    render(this.#newTripInfoView, tripMainElement, RenderPosition.AFTERBEGIN);
  };

  #handleTaskChange = (updatedTask) => {

    this.#pointModel = updateItem(this.#pointModel, updatedTask);
    this.#taskPresenter.get(updatedTask.id);
    this.#clearTaskList();
    this.#renderEvents(this.#pointModel, this.allOffersModel, this.#newListView.element, this.allDestinationsModel);
  };

  #clearTaskList = () => {
    this.#taskPresenter.forEach((presenter) => presenter.destroy());
    this.#taskPresenter.clear();
  };

  #handleModeChange = () => {
    this.#taskPresenter.forEach((presenter) => presenter.resetView());
  };
}
