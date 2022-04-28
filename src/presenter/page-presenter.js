import NewFiltersView from '../view/filter-view.js';
import NewSortingView from '../view/sorting-view.js';
import NewEditingFormView from '../view/editing-form-view.js';
import NewTripInfoView from '../view/info-view.js';
import NewItemView from '../view/item-view.js';
import NewListView from '../view/list-view.js';
import NewFormView from '../view/form-creation-view.js';
import { render } from '../render.js';

const NUMBER_ROUTE_POINTS = 3;

export default class PagePresenter {
  newListView = new NewListView();
  init = (headContainer, filterContainer, sortingContainer) => {
    this.headContainer = headContainer;
    this.filterContainer = filterContainer;
    this.sortingContainer = sortingContainer;

    render(new NewTripInfoView(), this.headContainer, 'afterbegin');
    render(new NewFiltersView(), this.filterContainer);
    render(new NewSortingView(), this.sortingContainer);
    render(this.newListView, this.sortingContainer);
    render(new NewEditingFormView(), this.newListView.getElement());
    render(new NewFormView(), this.newListView.getElement());
    for (let i = 0; i < NUMBER_ROUTE_POINTS; i++) {
      render(new NewItemView(), this.newListView.getElement());
    }
  };
}

