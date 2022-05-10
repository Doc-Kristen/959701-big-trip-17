import AbstractView from '../framework/view/abstract-view.js';
import { createNewFormTemplate } from './template/form-creation-template.js';

// Форма создания

export default class NewFormView extends AbstractView {

  get template() {
    return createNewFormTemplate();
  }

}
