import { combineReducers } from "redux";
import routesReducer from "./changeRouteReducer";
import tweetsReducer from './tweetsReducer';

export default combineReducers({
  route: routesReducer,
  tweets: tweetsReducer
});