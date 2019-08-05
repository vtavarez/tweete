import { FETCHED_TIMELINE, FETCHED_TWEETS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCHED_TIMELINE:
      return [...state, ...action.payload];
    case FETCHED_TWEETS:
      return [...action.payload, ...state];
    default:
      return state;
  }
};
