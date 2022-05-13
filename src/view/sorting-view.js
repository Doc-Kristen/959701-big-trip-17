import AbstractView from '../framework/view/abstract-view.js';
import { createSortTemplate } from './template/sorting-template.js';

// Сортировка

export default class NewSortingView extends AbstractView {

  get template() {
    return createSortTemplate();
  }

}
