import AbstractView from '../framework/view/abstract-view.js';
import { createListTemplate } from './template/list-template.js';

// Список

export default class ListView extends AbstractView {

  get template() {
    return createListTemplate();
  }
}
