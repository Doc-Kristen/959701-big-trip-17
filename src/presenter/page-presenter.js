import NewFiltersView from '../view/filter-view.js';
import NewSortingView from '../view/sorting-view.js';
import NewEditingFormView from '../view/editing-form-view.js';
import NewTripInfoView from '../view/info-view.js';
import NewItemView from '../view/item-view.js';
import NewListView from '../view/list-view.js';
import NewEmptyView from '../view/list-empty-view.js';
import NewFormView from '../view/form-creation-view.js';
import { render } from '../render.js';

const MIN_NUMBER_POINTS = 1;
const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const buttunNewEventElement = tripMainElement.querySelector('.trip-main__event-add-btn');

export default class PagePresenter {
  #newListView = new NewListView();
  init = (pointModel, offers) => {
    this.tasksModel = pointModel;
    this.allOffersModel = offers;

    render(new NewTripInfoView(), tripMainElement, 'afterbegin');
    render(new NewFiltersView(), controlsFiltersElement);
    render(new NewSortingView(), tripEventsElement);
    render(this.#newListView, tripEventsElement);
    if (this.tasksModel.length < MIN_NUMBER_POINTS) {
      render(new NewEmptyView(), tripEventsElement);
      buttunNewEventElement.addEventListener('click', () => (render(new NewFormView(), this.#newListView.element)));
    } else {
      for (let i = 0; i < this.tasksModel.length; i++) {
        this.#renderTask(this.tasksModel[i], this.allOffersModel, this.#newListView.element);
      }
    }
  };

  #renderTask = (point, offers) => {
    const itemComponent = new NewItemView(point, offers);
    const editEventComponent = new NewEditingFormView(point, offers);

    const replacePointToForm = () => {
      this.#newListView.element.replaceChild(editEventComponent.element, itemComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#newListView.element.replaceChild(itemComponent.element, editEventComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    itemComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editEventComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

    editEventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });

    render(itemComponent, this.#newListView.element);
  };
}
