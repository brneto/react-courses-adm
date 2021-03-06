import { handleActions, combineActions } from 'redux-actions';
import {
  ajaxCallIncrement,
  ajaxCallDecrement
} from '../actions/ajaxStatusActions';

const defaultState = 0;
const ajaxReducer = handleActions({
    [combineActions(ajaxCallIncrement, ajaxCallDecrement)]:
      (state, action) => state + action.payload,
  }, defaultState);

const ajaxStatusReducer = (state, action) => {
  const { type } = action;
  if (type.endsWith('_REQUEST')) {
    return ajaxReducer(state, ajaxCallIncrement());
  } else if (type.endsWith('_SUCCESS')) {
    return ajaxReducer(state, ajaxCallDecrement());
  }
  return ajaxReducer(state, action);
};

export default ajaxStatusReducer;
