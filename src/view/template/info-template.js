import { humanizeHeaderDueDate } from '../../utils.js';

const getRouteHeader = (points) => {

  switch (points.length) {
    case 1:
      return [points[0].destination.name];
    case 2:
      return [`${points[0].destination.name} &mdash; ${points[1].destination.name}`];
    case 3:
      return [`${points[0].destination.name} &mdash; ${points[1].destination.name} &mdash; ${points[2].destination.name}`];
    default:
      return [`${points[0].destination.name} &mdash; ... &mdash; ${points[points.length - 1].destination.name}`];
  }
};

const getTripInfoDates = (point) => {

  const startDate = point[0].dateFrom;
  const endDate = point[point.length - 1].dateTo;

  return `<p class="trip-info__dates">${humanizeHeaderDueDate(startDate)}&nbsp;&mdash;&nbsp;${humanizeHeaderDueDate(endDate)}</p>`;
};

const getTotalPrice = (points, allOffers) => {

  const pointsPrices = points.map((point) => point.basePrice);
  const sumOfPointPrice = pointsPrices.reduce((acc, number) => acc + number, 0);

  const selectedOffersPrice = [];

  for (const point of points) {
    const offerIndex = allOffers.findIndex((item) => item.type === point.type);
    const pointOffers = allOffers[offerIndex].offers;
    const selectedOffers = pointOffers.filter((item) => point.offers.some((el) => item.id === el));
    selectedOffers.forEach((item) => selectedOffersPrice.push(item.price));
  }

  const sumOfOffersPrice = selectedOffersPrice.reduce((acc, price) => acc + price, 0);

  return sumOfPointPrice + sumOfOffersPrice;
};

const createInfoTemplate = (points, allOffers) => {

  const routeHeader = getRouteHeader(points);
  const tripInfoDates = getTripInfoDates(points);
  const totalPrice = getTotalPrice(points, allOffers);

  return `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
<h1 class="trip-info__title">${routeHeader}</h1>
${tripInfoDates}
</div>
<p class="trip-info__cost">
     Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
</p>
</section>`;
};

export { createInfoTemplate };
