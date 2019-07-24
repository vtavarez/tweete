import { FETCHED_USER } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case FETCHED_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
