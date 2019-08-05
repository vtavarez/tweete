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
      return "home";
    case ROUTE_MENTIONS:
      return "mentions";
    case ROUTE_MESSAGES:
      return "messages";
    case ROUTE_SEARCH:
      return "search";
    case ROUTE_PROFILE:
      return "profile";
    case ROUTE_LIKES:
      return "likes";
    case ROUTE_FILTERS:
      return "filters";
    case ROUTE_LISTS:
      return "lists";
    default:
      return state;
  }
};
