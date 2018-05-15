import * as React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { marketsSetQuote } from '../actions/index';
import { withState, withHandlers, compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from '../selectors';

const QuotesButton = ({
  anchorEl,
  setAnchor,
  removeAnchor,
  quote,
  quotes,
  setQuote,
}: any) => (
  <div>
    <Button
      aria-owns="simple-menu"
      aria-haspopup="true"
      onClick={setAnchor}
    >
      {quote}
    </Button>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={removeAnchor}
    >
      {quotes.map((qt: string) => (
        <MenuItem key={qt} onClick={setQuote}>{qt}</MenuItem>
      ))}
    </Menu>
  </div>
);

const selector = createStructuredSelector({
  quote: selectors.marketsQuote,
  quotes: selectors.quotes,
});

const mapDispatchToProps = (dispatch: any) => ({
  setQuote: (quote: string) => dispatch(marketsSetQuote(quote)),
});

export default compose(
  withState('anchorEl', 'setAnchorEl', null),
  connect(selector, mapDispatchToProps),
  withHandlers({
    setAnchor: ({ setAnchorEl, setQuote }: any) => (e: any) => setAnchorEl(e.currentTarget),
    setQuote: ({ setAnchorEl, setQuote }: any) => (e: any) => {
      setQuote(e.currentTarget.textContent);
      setAnchorEl(null);
    },
    removeAnchor: ({ setAnchorEl }: any) => (e: any) => setAnchorEl(null),
  }),
)(QuotesButton);
