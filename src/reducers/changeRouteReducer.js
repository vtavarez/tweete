import { ROUTE_HOME, ROUTE_MENTIONS, ROUTE_MESSAGES, ROUTE_SEARCH, ROUTE_PROFILE } from '../actions/types';

const changeRouteReducer = (state = 'home', action) => {
 switch(action.type){
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
    default:
      return state;
  };
};

export default changeRouteReducer;