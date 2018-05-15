import { combineReducers } from 'redux';
import markets from './markets';
import quotes from './quotes';

export default combineReducers({
  markets,
  quotes,
});
