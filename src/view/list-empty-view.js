import AbstractView from '../framework/view/abstract-view.js';
import { createEmptyTemplate } from './template/list-empty.js';


// Сообщение при пустом списке точек

export default class NewEmptyView extends AbstractView {

  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyTemplate(this.#filterType);
  }
}
