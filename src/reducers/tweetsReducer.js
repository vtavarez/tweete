import { FETCHED_TWEETS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCHED_TWEETS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};