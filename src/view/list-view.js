import AbstractView from '../framework/view/abstract-view.js';
import { createListTemplate } from './template/list-template.js';

// Список

export default class NewListView extends AbstractView {

  get template() {
    return createListTemplate();
  }

}
