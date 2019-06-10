import {
  ROUTE_HOME,
  ROUTE_MENTIONS,
  ROUTE_MESSAGES,
  ROUTE_SEARCH,
  ROUTE_PROFILE,
  ROUTE_LIKES,
  ROUTE_FILTERS,
  ROUTE_LISTS
} from "../actions/types";

export default (state = "home", action) => {
  switch (action.type) {
    case ROUTE_HOME:
      return action.payload;
    case ROUTE_MENTIONS:
      return action.payload;
    case ROUTE_MESSAGES:
      return action.payload;
    case ROUTE_SEARCH:
      return action.payload;
    case ROUTE_PROFILE:
      return action.payload;
    case ROUTE_LIKES:
      return action.payload;
    case ROUTE_FILTERS:
      return action.payload;
    case ROUTE_LISTS:
      return action.payload;
    default:
      return state;
  }
};