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
  FETCHED_USER,
  FETCHED_TIMELINE,
  FETCHED_TWEETS
} from "./types";

const route = path => history.push(path);

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

export const fetchUser = () => dispatch => {
  window.ipcRenderer.send("fetch-user", localStorage.getItem("uid"));

  window.ipcRenderer.once("fetched-user", (event, user) => {
    console.log(JSON.parse(user));
    dispatch({
      type: FETCHED_USER,
      payload: JSON.parse(user)
    });
  });
};

export const fetchHomeTimeline = () => dispatch => {
  window.ipcRenderer.send("fetch-timeline");

  window.ipcRenderer.once("fetched-timeline", (event, timeline) => {
    console.log(JSON.parse(timeline));
    localStorage.setItem("timeline", timeline);
    dispatch({
      type: FETCHED_TIMELINE,
      payload: JSON.parse(timeline)
    });
  });
};

export const fetchTweets = () => (dispatch, getState) => {
  window.ipcRenderer.send("fetch-tweets", getState().tweets[0].id_str);

  window.ipcRenderer.once("fetched-tweets", (event, tweets) => {
    console.log(JSON.parse(tweets));
    dispatch({
      type: FETCHED_TWEETS,
      payload: JSON.parse(tweets)
    });
  });
};
