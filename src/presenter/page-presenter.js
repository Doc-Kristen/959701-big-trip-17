import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../mock/util.js';
import NewFiltersView from '../view/filter-view.js';
import NewSortingView from '../view/sorting-view.js';
import NewTripInfoView from '../view/info-view.js';
import NewListView from '../view/list-view.js';
import NewEmptyView from '../view/list-empty-view.js';
import NewButtonCreateEventView from '../view/button-new-event-view.js';
import EventPresenter from './event-presenter.js';
import FormEventPresenter from './form-event-presenter.js';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

export default class PagePresenter {
  #newTripInfoView = new NewTripInfoView();
  #newFiltersView = new NewFiltersView();
  #newSortingView = new NewSortingView();
  #newListView = new NewListView();
  #newButtonCreateEventView = new NewButtonCreateEventView();
  #newEmptyView = new NewEmptyView();
  #tasksModel = null;
  #newFormView = null;

  #taskPresenter = new Map();

  init = (pointModel, offers) => {
    this.#tasksModel = [...pointModel];

    this.allOffersModel = offers;


    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderNewSorting();
    this.#renderList();
    this.#renderButtonCreateEvent();
    this.#renderEvents(this.#tasksModel, this.allOffersModel, this.#newListView.element);

  };

  #renderFormEvent = () => {
    this.#newFormView = new FormEventPresenter(this.#newListView.element, this.#newButtonCreateEventView.element);
    this.#newFormView.init();
  };

  #renderNoEventConponent = () => {
    render(this.#newEmptyView, tripEventsElement);
  };

  #renderEvent = (events, offers, container) => {
    const taskPresenter = new EventPresenter(events, offers, container, this.#handleTaskChange, this.#handleModeChange);
    taskPresenter.init();
    this.#taskPresenter.set(events.id, taskPresenter);
  };

  #renderEvents = (events, offers, container) => {

    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        this.#renderEvent(events[i], offers, container);
      }
    } else {
      this.#renderNoEventConponent();
    }
  };

  #renderButtonCreateEvent = () => {
    render(this.#newButtonCreateEventView, tripMainElement);
    this.#newButtonCreateEventView.setAddEventClickHandler(this.#renderFormEvent);
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
    this.#tasksModel = updateItem(this.#tasksModel, updatedTask);
    this.#taskPresenter.get(updatedTask.id);
    this.#clearTaskList();
    this.#renderEvents(this.#tasksModel, this.allOffersModel, this.#newListView.element);
  };

  #clearTaskList = () => {
    this.#taskPresenter.forEach((presenter) => presenter.destroy());
    this.#taskPresenter.clear();
  };

  #handleModeChange = () => {
    this.#taskPresenter.forEach((presenter) => presenter.resetView());
  };

}
