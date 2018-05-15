import {
  QUOTES_RECEIVE,
} from '../actions';

export default function(
  state: string[] = ['ZUSD'],
  action: any,
) {
  if (action.type === QUOTES_RECEIVE) {
    return action.payload;
  }
  return state;
}
