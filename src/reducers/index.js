import { combineReducers } from "redux";
import routesReducer from "./routesReducer";
import tweetsReducer from "./tweetsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  route: routesReducer,
  tweets: tweetsReducer,
  user: userReducer
});
