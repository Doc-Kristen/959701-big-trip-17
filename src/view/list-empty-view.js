import AbstractView from '../framework/view/abstract-view.js';
import { createEmptyTemplate } from './template/list-empty.js';

// Сообщение при пустом списке точек

export default class NewEmptyView extends AbstractView {

  get template() {
    return createEmptyTemplate();
  }

}
