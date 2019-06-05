import { combineReducers } from 'redux';
import changeRouteReducer from './changeRouteReducer';


export default combineReducers({
  route: changeRouteReducer
});