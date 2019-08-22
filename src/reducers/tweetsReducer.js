import {
  FETCHED_TIMELINE,
  FETCHED_TWEETS,
  FETCHING_PREVIOUS_TWEETS,
  FETCHED_PREVIOUS_TWEETS
} from "../actions/types";

export default (state = { status: "fetchingTweets", timeline: [] }, action) => {
  switch (action.type) {
    case FETCHED_TIMELINE:
      return {
        status: "fetchedTweets",
        timeline: [...state.timeline, ...action.payload]
      };
    case FETCHED_TWEETS:
      return {
        status: "fetchedTweets",
        timeline: [...action.payload, ...state.timeline]
      };
    case FETCHING_PREVIOUS_TWEETS:
      return {
        status: "fetchingPreviousTweets",
        timeline: [...state.timeline]
      };
    case FETCHED_PREVIOUS_TWEETS:
      return {
        status: "fetchedPreviousTweets",
        timeline: [...state.timeline, ...action.payload]
      };
    default:
      return state;
  }
};
