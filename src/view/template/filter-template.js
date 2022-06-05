const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return `<div class="trip-filters__filter">
      <input
        id="filter__${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        ${type === currentFilterType ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}
        value="${type}"
      />
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`;
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export { createFilterTemplate };
