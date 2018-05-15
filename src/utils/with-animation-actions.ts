import {
  withHandlers,
  withReducer,
  lifecycle,
  compose,
} from 'recompose';

const ANIMATION_INCREMENT = 'ANIMATION_INCREMENT';
const ANIMATION_DECREMENT = 'ANIMATION_DECREMENT';
const ANIMATION_RESET = 'ANIMATION_RESET';

const actionActionsReducer = (state: any = {}, action: any) => {
  if (action.type === ANIMATION_INCREMENT) {
    return {
      ...state,
      [action.pair]: 'increase',
    };
  }
  if (action.type === ANIMATION_DECREMENT) {
    return {
      ...state,
      [action.pair]: 'decrease',
    };
  }
  if (action.type === ANIMATION_RESET) {
    return {
      ...state,
      [action.pair]: undefined,
    };
  }
  return state;
};

export default () => compose(
  withReducer('animationActions', 'dispatch', actionActionsReducer, {}),
  withHandlers({
    animationIncrease: ({ dispatch }) => (pair: string) => dispatch({ pair, type: ANIMATION_INCREMENT }),
    animationDecrease: ({ dispatch }) => (pair: string) => dispatch({ pair, type: ANIMATION_DECREMENT }),
    animationReset: ({ dispatch }) => (pair: string) => () => dispatch({ pair, type: ANIMATION_RESET }),
  }),
  lifecycle({
    componentWillReceiveProps(nextProps: any) {
      const items = Object.keys(nextProps.items);
      items.forEach((pair: string) => {
        if (this.props.items[pair] && nextProps.items[pair]) {
          const price = this.props.items[pair].price;
          const nextPrice = nextProps.items[pair].price;
          if (price && nextPrice) {
            if (nextPrice > price) {
              this.props.animationIncrease(pair);
            }
            if (nextPrice < price) {
              this.props.animationDecrease(pair);
            }
          }
        }
      });
    },
  }),
);
