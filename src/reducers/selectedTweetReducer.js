import {
  SELECTED_TWEET
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case SELECTED_TWEET:
      return action.payload;
    default:
      return state;
  }
};