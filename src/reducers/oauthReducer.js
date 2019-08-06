import { OAUTH_CANCELLED, OAUTH_COMPLETED } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case OAUTH_CANCELLED:
      return "oauth-cancelled";
    case OAUTH_COMPLETED:
      return "oauth-completed";
    default:
      return state;
  }
};
