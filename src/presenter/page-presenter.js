import { filter } from '../utils.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortDayUp, sortTimeDown, sortPriceDown } from '../utils.js';
import SortingView from '../view/sorting-view.js';
import NewTripInfoView from '../view/info-view.js';
import ListView from '../view/list-view.js';
import NoPointsView from '../view/list-empty-view.js';
import NewButtonCreateEventView from '../view/button-new-event-view.js';
import EventPresenter from './event-presenter.js';
import NewPointPresenter from './new-event-presenter.js';
import LoadingView from '../view/loading-view.js';


const tripMainElement = document.querySelector('.trip-main');

const DEFAULT_POINT = {
  basePrice: '',
  dateFrom: new Date,
  dateTo: new Date,
  destination: { description: '', name: null, pictures: [] },
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

export default class PagePresenter {
  #boardContainer = null;

  #sortComponent = null;
  #newTripInfoView = new NewTripInfoView();
  #loadingComponent = new LoadingView();
  #newListView = new ListView();
  #newButtonCreateEventView = new NewButtonCreateEventView();
  #newNoPointsView = null;

  #pointsModel = null;
  #filterModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #taskPresenter = new Map();
  #pointNewPresenter = null;

  constructor(pointsModel, offersModel, destinationsModel, boardContainer, filterModel) {
    this.#boardContainer = boardContainer;

    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointNewPresenter = new NewPointPresenter(this.#newListView.element, this.#handleViewAction, this.#handleModeChange);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {

    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredTasks = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredTasks.sort(sortDayUp);
      case SortType.TIME:
        return filteredTasks.sort(sortTimeDown);
      case SortType.PRICE:
        return filteredTasks.sort(sortPriceDown);
    }
    return filteredTasks;

  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init = () => {

    this.#renderBoard();
    this.#renderButtonCreateEvent();

  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #createNewEvent = (events, offers, destinations) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(events, offers, destinations);
  };

  #renderNoEventConponent = () => {
    this.#newNoPointsView = new NoPointsView(this.#filterType);
    render(this.#newNoPointsView, this.#boardContainer, RenderPosition.AFTEREND);
  };

  #renderEvent = (points, offers, destinations) => {

    const taskPresenter = new EventPresenter(this.#newListView.element, this.#handleViewAction, this.#handleModeChange);

    taskPresenter.init(points, offers, destinations);
    this.#taskPresenter.set(points.id, taskPresenter);

  };

  #renderEvents = (tasks, offers, destinations) => tasks.forEach((task) => this.#renderEvent(task, offers, destinations));

  #renderBoard = () => {
    render(this.#newListView, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (this.points.length > 0) {
      this.#renderTripInfo();
      this.#renderSort();

      this.#renderEvents(this.points, this.offers, this.destinations);
    } else {
      this.#renderNoEventConponent();
    }

  };

  #renderButtonCreateEvent = () => {
    render(this.#newButtonCreateEventView, tripMainElement);
    this.#newButtonCreateEventView.setAddEventClickHandler(() => {
      this.#newButtonCreateEventView.element.disabled = true;
      this.#currentSortType = SortType.DAY;
      this.#createNewEvent(DEFAULT_POINT, this.offers, this.destinations);
    });
  };

  #renderTripInfo = () => {
    render(this.#newTripInfoView, tripMainElement, RenderPosition.AFTERBEGIN);
  };

  #handleViewAction = (actionType, updateType, update) => {
    this.#newButtonCreateEventView.element.disabled = false;
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #clearTaskList = () => {
    this.#taskPresenter.forEach((presenter) => presenter.destroy());
    this.#taskPresenter.clear();
    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    this.#currentSortType = SortType.DAY;

    if (this.#newNoPointsView) {
      remove(this.#newNoPointsView);
    }
  };

  #handleModeChange = () => {
    this.#taskPresenter.forEach((presenter) => presenter.resetView());
    this.#pointNewPresenter.destroy();
    this.#newButtonCreateEventView.element.disabled = false;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#clearTaskList();
    this.#currentSortType = sortType;
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortingView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);

  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#taskPresenter.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearTaskList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearTaskList();
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };
}
