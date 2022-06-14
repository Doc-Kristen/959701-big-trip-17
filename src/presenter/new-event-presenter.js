import { render, remove, RenderPosition } from '../framework/render';
import { UserAction, UpdateType } from '../const.js';
import FormOfcreationView from '../view/form-creation-view';

export default class NewPointPresenter {
  #point = null;
  #offers = null;
  #destinations = null;
  #destroyCallback = null;

  #pointListContainer = null;
  #changeData = null;
  #NewPointFormComponent = null;

  constructor(pointListContainer, changeData) {

    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;

  }

  init = (point, offers, destinations, callback) => {
    this.#destroyCallback = callback;

    if (this.#NewPointFormComponent !== null) {
      return;
    }
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#NewPointFormComponent = new FormOfcreationView(this.#point, this.#offers, this.#destinations);

    this.#NewPointFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#NewPointFormComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#NewPointFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    this.#NewPointFormComponent.reset(this.#point);

    document.addEventListener('keydown', this.#escKeyDownHandler);

  };

  destroy = () => {
    if (this.#NewPointFormComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#NewPointFormComponent);
    this.#NewPointFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#NewPointFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#NewPointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#NewPointFormComponent.shake(resetFormState);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#changeData(
        UpdateType.MINOR
      );
      this.destroy();
    }
  };

  #handleDeleteClick = () => {
    this.#changeData(
      UpdateType.MINOR
    );
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      point
    );
  };
}
