import { render, remove, RenderPosition } from '../framework/render';
import NewFormView from '../view/form-creation-view';

export default class FormEventPresenter {

  #newFormView = new NewFormView();
  #container = null;

  constructor(container, buttonCall) {

    this.#container = container;
    this.buttonCall = buttonCall;
  }

  init = () => {
    this.#renderFormEvent();

  };

  #renderFormEvent = () => {

    const buttonNewEventElement = this.buttonCall.querySelector('button');

    render(this.#newFormView, this.#container, RenderPosition.AFTERBEGIN);
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        remove(this.#newFormView);
        document.removeEventListener('keydown', onEscKeyDown);
        buttonNewEventElement.disabled = false;
      }
    };

    buttonNewEventElement.disabled = true;

    document.addEventListener('keydown', onEscKeyDown);

    this.#newFormView.setCloseClickHandler(() => {
      remove(this.#newFormView);
      buttonNewEventElement.disabled = false;
      document.removeEventListener('keydown', onEscKeyDown);
    });

    this.#newFormView.setFormSubmitHandler(() => {
      buttonNewEventElement.disabled = false;
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };
}
