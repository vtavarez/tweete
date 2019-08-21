import { FETCHED_TIMELINE, FETCHED_TWEETS } from "../actions/types";

export default (state = { status: "isFetching", timeline: [] }, action) => {
  switch (action.type) {
    case FETCHED_TIMELINE:
      return {
        status: "isFetched",
        timeline: [...state.timeline, ...action.payload]
      };
    case FETCHED_TWEETS:
      return {
        status: "isFetched",
        timeline: [...action.payload, ...state.timeline]
      };
    default:
      return state;
  }
};
