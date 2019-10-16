import { combineReducers } from 'redux';
import login from './login';
import exception from './exception';

export default combineReducers({
  login,
  exception
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});