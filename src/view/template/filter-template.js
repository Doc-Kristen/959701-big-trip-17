const createFilterItemTemplate = (filterName, isChecked, isDisabled) => (
  `<div class="trip-filters__filter">
      <input
        id="filter__${filterName.name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="everything"
        ${isChecked ? 'checked' : ''}
        ${isDisabled && !isChecked ? 'disabled' : ''}
      />
      <label class="trip-filters__filter-label" for="filter-${filterName.name}">${filterName.name}</label>
    </div>`
);

const createFilterTemplate = (filterItems) => {
  const itemsFilterTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0, index !== 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${itemsFilterTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export { createFilterTemplate };
