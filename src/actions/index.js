import {
  ROUTE_HOME,
  ROUTE_MENTIONS,
  ROUTE_MESSAGES,
  ROUTE_SEARCH,
  ROUTE_PROFILE,
  ROUTE_LIKES,
  ROUTE_FILTERS,
  ROUTE_LISTS
} from "./types";
import history from "../history";


const _route = path => history.push(path);

export const routeHome = (path, route) => dispatch => {

  dispatch({ type: ROUTE_HOME, payload: route });
  _route(path);
};

export const routeMentions = (path, route) => dispatch => {

  dispatch({ type: ROUTE_MENTIONS, payload: route });
  _route(path);
};

export const routeMessages = (path, route) => dispatch => {

  dispatch({ type: ROUTE_MESSAGES, payload: route });
  _route(path);
};

export const routeSearch = (path, route) => dispatch => {

  dispatch({ type: ROUTE_SEARCH, payload: route });
  _route(path);
};

export const routeProfile = (path, route) => dispatch => {

  dispatch({ type: ROUTE_PROFILE, payload: route });
  _route(path);
};

export const routeLikes = (path, route) => dispatch => {

  dispatch({ type: ROUTE_LIKES, payload: route });
  _route(path);
};

export const routeFilters = (path, route) => dispatch => {

  dispatch({ type: ROUTE_FILTERS, payload: route });
  _route(path);
};

export const routeLists = (path, route) => dispatch => {

  dispatch({ type: ROUTE_LISTS, payload: route });
  _route(path);
};

