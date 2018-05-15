import * as React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow, TablePagination } from 'material-ui/Table';
import { withHandlers, compose } from 'recompose';
import { marketsSetPage, marketsSetQuote } from '../actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Transition } from 'react-transition-group';
import { withStyles } from 'material-ui/styles';
import * as selectors from '../selectors';
import cx from 'classnames';
import withAnimationActions from '../utils/with-animation-actions';

const duration = 800;

const styles = (theme: any) => ({
  default: {
    transition: `background-color ${duration}ms ease-in-out`,
    backgroundColor: 'white',
  },
  'increase-entering': { backgroundColor: theme.palette.secondary.light },
  'decrease-entering': { backgroundColor: theme.palette.primary.light },
});
const MarketsTable = ({
  items,
  quote,
  animationActions,
  animationReset,
  classes,
}: any) => (
  <div style={{ padding: '0 26px', marginBottom: '1.5rem' }}>
    <Table className="scroll">
      <TableHead style={{ backgroundColor: '#EEEEEE' }}>
        <TableRow>
          <TableCell>Pair</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Average Price</TableCell>
          <TableCell>Volume Today</TableCell>
          <TableCell>Trades Today</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(items).map((pair: string) => {
          const item = items[pair];
          const action = animationActions[pair];
          return (
            <Transition
              in={!!action}
              timeout={duration}
              onEnter={(node: any) => node.scrollTop}
              onEntered={animationReset(pair)}
              key={pair}
            >
              {(state: string) => (
                <TableRow className={cx([classes.default, action && classes[`${action}-${state}`]])}>
                  <TableCell>{pair}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.averagePrice}</TableCell>
                  <TableCell>{item.volumeToday}</TableCell>
                  <TableCell>{item.tradesToday}</TableCell>
                </TableRow>
              )}
            </Transition>
          );
        })}
      </TableBody>
    </Table>
  </div>
);

const selector = createStructuredSelector({
  items: selectors.marketsItems,
  quote: selectors.marketsQuote,
});

export default compose(
  withStyles(styles),
  connect(selector),
  withAnimationActions(),
)(MarketsTable);
