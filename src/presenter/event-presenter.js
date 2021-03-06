import { render, replace, remove } from '../framework/render';
import EditingFormView from '../view/editing-form-view';
import ItemView from '../view/item-view';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #point = null;
  #offers = null;
  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #destinations = null;

  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, changeMode) {

    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

  }

  init = (point, offers, destinations) => {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new ItemView(this.#point, this.#offers);
    this.#pointEditComponent = new EditingFormView(this.#point, this.#offers, this.#destinations);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setCloseClickHandler(this.resetView);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointComponent.setChooseFavoriteClickHandler(() => this.#handleFavoriteClick());

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointEditComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      { ...this.#point, isFavorite: !this.#point.isFavorite },
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetView();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
    this.#pointEditComponent.reset(this.#point);
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      point,
    );
  };
}
