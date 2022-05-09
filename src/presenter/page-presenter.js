import NewFiltersView from '../view/filter-view.js';
import NewSortingView from '../view/sorting-view.js';
import NewEditingFormView from '../view/editing-form-view.js';
import NewTripInfoView from '../view/info-view.js';
import NewItemView from '../view/item-view.js';
import NewListView from '../view/list-view.js';
// import NewFormView from '../view/form-creation-view.js';
import { render } from '../render.js';

const pageMainElement = document.querySelector('.page-body__page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const controlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

export default class PagePresenter {
  #newListView = new NewListView();
  init = (pointModel, offersModel, offers) => {
    this.tasksModel = pointModel;
    this.offersModel = offersModel;
    this.allOffersModel = offers;

    render(new NewTripInfoView(), tripMainElement, 'afterbegin');
    render(new NewFiltersView(), controlsFiltersElement);
    render(new NewSortingView(), tripEventsElement);
    render(this.#newListView, tripEventsElement);
    // render(new NewFormView(this.allOffersModel), this.newListView.getElement());
    for (let i = 0; i < this.tasksModel.length; i++) {
      this.#renderTask(this.tasksModel[i], this.allOffersModel, this.#newListView.getElement());
    }
  };

  #renderTask = (point, offers) => {
    const itemComponent = new NewItemView(point, offers);
    const editEventComponent = new NewEditingFormView (point, offers);

    const replacePointToForm = () => {
      this.#newListView.getElement().replaceChild(editEventComponent.getElement(), itemComponent.getElement());
    };

    const replaceFormToPoint = () => {
      this.#newListView.getElement().replaceChild(itemComponent.getElement(),editEventComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    itemComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editEventComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

    editEventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });

    render(itemComponent, this.#newListView.getElement());
  };

}
