import { ROUTE_HOME, ROUTE_MENTIONS, ROUTE_MESSAGES, ROUTE_SEARCH, ROUTE_PROFILE } from './types';
import history from '../history';

export const changeRoute = (path, route) => {
  history.push(path);

  switch(route){
    case 'home':
     return { type: ROUTE_HOME, payload: route };
    case 'mentions':
      return { type: ROUTE_MENTIONS, payload: route };
    case 'messages':
      return { type: ROUTE_MESSAGES, payload: route };
    case 'search':
      return { type: ROUTE_SEARCH, payload: route };
    case 'profile':
      return { type: ROUTE_PROFILE, payload: route };
    default:
  };
};