import history from "../history";
import {
  ROUTE_HOME,
  ROUTE_MENTIONS,
  ROUTE_MESSAGES,
  ROUTE_SEARCH,
  ROUTE_PROFILE,
  ROUTE_LIKES,
  ROUTE_FILTERS,
  ROUTE_LISTS,
  OAUTH_CANCELLED,
  OAUTH_COMPLETED,
  FETCHED_USER,
  FETCHED_TIMELINE,
  FETCHED_TWEETS
} from "./types";

const ipcRenderer = window.require("electron").ipcRenderer;
const route = path => history.replace(path);

export const changeRoute = path => {
  route(path);
  switch (path) {
    case "/":
      return { type: ROUTE_HOME };
    case "/Mentions":
      return { type: ROUTE_MENTIONS };
    case "/Messages":
      return { type: ROUTE_MESSAGES };
    case "/Search":
      return { type: ROUTE_SEARCH };
    case "/Profile":
      return { type: ROUTE_PROFILE };
    case "/Likes":
      return { type: ROUTE_LIKES };
    case "/Filters":
      return { type: ROUTE_FILTERS };
    case "/Lists":
      return { type: ROUTE_LISTS };
    default:
  }
};

export const beginOAuth = () => dispatch => {
  ipcRenderer.send("twitter-oauth");

  ipcRenderer.once("twitter-oauth-response", (event, uid) => {
    if (!uid) {
      dispatch({
        type: OAUTH_CANCELLED
      });
    } else {
      localStorage.setItem("uid", uid);
      localStorage.setItem("authenticated", "true");
      dispatch(fetchUser());
      dispatch(fetchHomeTimeline());
      dispatch({
        type: OAUTH_COMPLETED
      });
    }
  });
};

export const fetchUser = () => dispatch => {
  ipcRenderer.send("fetch-user", localStorage.getItem("uid"));

  ipcRenderer.once("fetched-user", (event, user) => {
    console.log(JSON.parse(user));
    dispatch({
      type: FETCHED_USER,
      payload: JSON.parse(user)
    });
  });
};

export const fetchHomeTimeline = () => dispatch => {
  ipcRenderer.send("fetch-timeline");

  ipcRenderer.once("fetched-timeline", (event, timeline) => {
    console.log(JSON.parse(timeline));
    localStorage.setItem("timeline", timeline);
    dispatch({
      type: FETCHED_TIMELINE,
      payload: JSON.parse(timeline)
    });
  });
};

export const fetchTweets = () => (dispatch, getState) => {
  ipcRenderer.send("fetch-tweets", getState().tweets[0].id_str);

  ipcRenderer.once("fetched-tweets", (event, tweets) => {
    dispatch({
      type: FETCHED_TWEETS,
      payload: JSON.parse(tweets)
    });
  });
};
