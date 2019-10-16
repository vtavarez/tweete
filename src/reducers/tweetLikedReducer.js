import { TWEET_LIKED, TWEET_UNLIKED } from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case TWEET_LIKED:
      return true;
    case TWEET_UNLIKED:
      return false;
    default:
      return state;
  }
};
