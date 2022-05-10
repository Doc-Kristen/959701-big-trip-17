import './model/point-model';
import PagePresenter from './presenter/page-presenter.js';
import PointModel from './model/point-model';
import OfferModel from './model/offer-model';

const pagePresenter = new PagePresenter();
const pointModel = new PointModel();
const offerModel = new OfferModel();

pagePresenter.init(pointModel.task, offerModel.offers);
