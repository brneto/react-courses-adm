//import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import authors from './authorReducer';
import courses from './courseReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const combinedReducer = combineReducers({
  authors,
  courses,
  ajaxCallsInProgress,
  router,
});

export default combinedReducer;
