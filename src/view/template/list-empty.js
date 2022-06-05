import { NoPointsTextType } from '../../const.js';

const createEmptyTemplate = (filterType) => {
  const noPointsTextValue = NoPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noPointsTextValue}
    </p>`);
};

export { createEmptyTemplate };
