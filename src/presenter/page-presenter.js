import NewFiltersView from '../view/filter-view.js';
import NewSortingView from '../view/sorting-view.js';
import NewEditingFormView from '../view/editing-form-view.js';
import NewTripInfoView from '../view/info-view.js';
import NewItemView from '../view/item-view.js';
import NewListView from '../view/list-view.js';
import NewFormView from '../view/form-creation-view.js';
import { render } from '../render.js';

export default class PagePresenter {
  newListView = new NewListView();
  init = (headContainer, filterContainer, sortingContainer, pointModel, offersModel, offers) => {
    this.headContainer = headContainer;
    this.filterContainer = filterContainer;
    this.sortingContainer = sortingContainer;
    this.tasksModel = pointModel;
    this.offersModel = offersModel;
    this.allOffersModel = offers;

    render(new NewTripInfoView(), this.headContainer, 'afterbegin');
    render(new NewFiltersView(), this.filterContainer);
    render(new NewSortingView(), this.sortingContainer);
    render(this.newListView, this.sortingContainer);
    render(new NewEditingFormView(this.tasksModel[0], this.allOffersModel), this.newListView.getElement());
    render(new NewFormView(this.allOffersModel), this.newListView.getElement());
    for (let i = 0; i < this.tasksModel.length; i++) {
      render(new NewItemView(this.tasksModel[i], this.allOffersModel), this.newListView.getElement());
    }
  };
}

