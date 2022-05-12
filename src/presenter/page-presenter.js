import { render, replace, remove } from '../framework/render.js';
import NewFiltersView from '../view/filter-view.js';
import NewSortingView from '../view/sorting-view.js';
import NewEditingFormView from '../view/editing-form-view.js';
import NewTripInfoView from '../view/info-view.js';
import NewItemView from '../view/item-view.js';
import NewListView from '../view/list-view.js';
import NewEmptyView from '../view/list-empty-view.js';
import NewFormView from '../view/form-creation-view.js';
import NewButtonCreateEventView from '../view/button-new-event-view.js';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

export default class PagePresenter {
  #newListView = new NewListView();
  #newButtonCreateEventView = new NewButtonCreateEventView();

  init = (pointModel, offers) => {
    this.tasksModel = pointModel;
    this.allOffersModel = offers;

    render(new NewTripInfoView(), tripMainElement, 'afterbegin');
    render(new NewFiltersView(), controlsFiltersElement);
    render(new NewSortingView(), tripEventsElement);
    render(this.#newListView, tripEventsElement);
    render(this.#newButtonCreateEventView, tripMainElement);
    this.#newButtonCreateEventView.setAddEventClickHandler(this.#renderFormEvent);

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
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editEventComponent.setCloseClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(itemComponent, this.#newListView.element);
  };

  #renderFormEvent = () => {

    const newFormView = new NewFormView();
    const buttonNewEventElement = this.#newButtonCreateEventView.element.querySelector('button');

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        remove(newFormView);
        document.removeEventListener('keydown', onEscKeyDown);
        buttonNewEventElement.disabled = false;
      }
    };

    render(newFormView, this.#newListView.element, 'afterbegin');

    buttonNewEventElement.disabled = true;

    document.addEventListener('keydown', onEscKeyDown);

    newFormView.setCloseClickHandler(() => {
      remove(newFormView);
      buttonNewEventElement.disabled = false;
      document.removeEventListener('keydown', onEscKeyDown);
    });

    newFormView.setFormSubmitHandler(() => {
      remove(newFormView);
      buttonNewEventElement.disabled = false;
      document.removeEventListener('keydown', onEscKeyDown);
    });

  };
}
