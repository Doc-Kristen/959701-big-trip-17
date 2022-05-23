import { render, replace, remove } from '../framework/render';
import NewEditingFormView from '../view/editing-form-view';
import NewItemView from '../view/item-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  point = null;
  #offers = null;
  #taskListContainer = null;
  #changeData = null;
  #taskComponent = null;
  #taskEditComponent = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;

  constructor(point, offers, taskListContainer, changeData, changeMode) {
    this.point = point;
    this.#offers = offers;
    this.#taskListContainer = taskListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = () => {

    const prevTaskComponent = this.#taskComponent;
    const prevTaskEditComponent = this.#taskEditComponent;

    this.#taskComponent = new NewItemView(this.point, this.#offers);
    this.#taskEditComponent = new NewEditingFormView(this.point, this.#offers);

    this.#taskComponent.setEditClickHandler(this.#handleEditClick);
    this.#taskEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#taskEditComponent.setCloseClickHandler(this.#handleFormSubmit);
    this.#taskComponent.setChooseFavoriteClickHandler(() => this.#handleFavoriteClick());

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this.#taskComponent, this.#taskListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#taskComponent, prevTaskComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);

  };

  destroy = () => {
    remove(this.#taskComponent);
    remove(this.#taskEditComponent);
  };

  #handleFavoriteClick = () => this.#changeData({ ...this.point, isFavorite: !this.point.isFavorite });

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm = () => {
    replace(this.#taskEditComponent, this.#taskComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#taskComponent, this.#taskEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
    this.#changeData(this.point);
  };

}
