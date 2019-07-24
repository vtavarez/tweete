import {
  ROUTE_HOME,
  ROUTE_MENTIONS,
  ROUTE_MESSAGES,
  ROUTE_SEARCH,
  ROUTE_PROFILE,
  ROUTE_LIKES,
  ROUTE_FILTERS,
  ROUTE_LISTS,
  FETCHED_USER
} from "./types";
import history from "../routerHistory";

const _route = path => history.push(path);

export const changeRoute = (path, route) => {
  _route(path);
  switch (route) {
    case "home":
      return { type: ROUTE_HOME, payload: route };
    case "mentions":
      return { type: ROUTE_MENTIONS, payload: route };
    case "messages":
      return { type: ROUTE_MESSAGES, payload: route };
    case "search":
      return { type: ROUTE_SEARCH, payload: route };
    case "profile":
      return { type: ROUTE_PROFILE, payload: route };
    case "likes":
      return { type: ROUTE_LIKES, payload: route };
    case "filters":
      return { type: ROUTE_FILTERS, payload: route };
    case "lists":
      return { type: ROUTE_LISTS, payload: route };
    default:
  }
};

export const fetchUser = () => dispatch => {
  window.ipcRenderer.send("fetch-user", localStorage.getItem("uid"));

  window.ipcRenderer.on("fetched-user", (event, data) => {
    const [user, timeline] = data;
    console.log(JSON.parse(user));
    console.log(JSON.parse(timeline));
    dispatch({
      type: FETCHED_USER,
      payload: { profile: JSON.parse(user), timeline: JSON.parse(timeline) }
    });
  });
};
