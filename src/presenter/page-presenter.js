import { render, replace } from '../framework/render.js';
import NewFiltersView from '../view/filter-view.js';
import NewSortingView from '../view/sorting-view.js';
import NewEditingFormView from '../view/editing-form-view.js';
import NewTripInfoView from '../view/info-view.js';
import NewItemView from '../view/item-view.js';
import NewListView from '../view/list-view.js';
import NewEmptyView from '../view/list-empty-view.js';
import NewFormView from '../view/form-creation-view.js';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const buttunNewEventElement = tripMainElement.querySelector('.trip-main__event-add-btn');

export default class PagePresenter {
  #newListView = new NewListView();
  #newFormView = new NewFormView();

  init = (pointModel, offers) => {
    this.tasksModel = pointModel;
    this.allOffersModel = offers;

    render(new NewTripInfoView(), tripMainElement, 'afterbegin');
    render(new NewFiltersView(), controlsFiltersElement);
    render(new NewSortingView(), tripEventsElement);
    render(this.#newListView, tripEventsElement);
    buttunNewEventElement.addEventListener('click', () => (render(this.#newFormView, this.#newListView.element, 'beforebegin')));

    if (this.tasksModel.length > 0) {
      for (let i = 0; i < this.tasksModel.length; i++) {
        this.#renderTask(this.tasksModel[i], this.allOffersModel, this.#newListView.element);
      }
    } else {
      render(new NewEmptyView(), tripEventsElement);
    }
  };

  #renderTask = (point, offers) => {
    const itemComponent = new NewItemView(point, offers);
    const editEventComponent = new NewEditingFormView(point, offers);

    const replacePointToForm = () => {
      replace(editEventComponent, itemComponent);
    };

    const replaceFormToPoint = () => {
      replace(itemComponent, editEventComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    itemComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editEventComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
    });

    editEventComponent.setCloseClickHandler(() => {
      replaceFormToPoint();
    });

    render(itemComponent, this.#newListView.element);
  };
}
