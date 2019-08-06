import { combineReducers } from "redux";
import oauthReducer from "./oauthReducer";
import routesReducer from "./routesReducer";
import tweetsReducer from "./tweetsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  oauth: oauthReducer,
  route: routesReducer,
  tweets: tweetsReducer,
  user: userReducer
});
