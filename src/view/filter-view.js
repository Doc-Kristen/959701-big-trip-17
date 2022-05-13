import AbstractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from './template/filter-template.js';

// Фильтры

export default class NewFiltersView extends AbstractView {

  get template() {
    return createFilterTemplate();
  }

}
