import './model/point-model';
import PagePresenter from './presenter/page-presenter.js';
import PointModel from './model/point-model';
import OfferModel from './model/offer-model';
import DestinationModel from './model/destination-model';

const pagePresenter = new PagePresenter();
const pointModel = new PointModel();
const offerModel = new OfferModel();
const destinationModel = new DestinationModel();

pagePresenter.init(pointModel.task, offerModel.offers, destinationModel.allDestinations);
