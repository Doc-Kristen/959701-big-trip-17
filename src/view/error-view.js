import AbstractView from '../framework/view/abstract-view.js';

const createNoTaskTemplate = (errorTextType) => (
  `<p class=trip-events__msg>
      ${errorTextType}
    </p>`
);

export default class ErrorView extends AbstractView {
  #errorTextType = null;
  constructor(errorTextType) {
    super();
    this.#errorTextType = errorTextType;
  }

  get template() {
    return createNoTaskTemplate(this.#errorTextType);
  }
}
