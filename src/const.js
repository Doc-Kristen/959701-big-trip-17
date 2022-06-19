const PointType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECKIN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const ErrorTextType = {
  OFFERS: 'Can\'t get offers. Please check if entered address is correct or try again later.',
  POINTS: 'Can\'t get point.',
  DESTINATIONS: 'Can\'t get destinations. Please check if entered address is correct or try again later.',
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const TimeInMs = {
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000,
  SECOND: 1000,
};

const TimeValue = {
  HOURS_PER_DAY: 24,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
};

export { SortType, UserAction, UpdateType, FilterType, NoPointsTextType, TimeInMs, PointType, ErrorTextType, TimeValue };
