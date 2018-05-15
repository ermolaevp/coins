import * as React from 'react';
import MarketsTable from '../../components/markets-table';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';

const styles = (theme: any) => ({
  linkWrapper: {
    margin: '1rem auto',
    fontSize: '14px',
    width: '180px',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
});

const Markets = ({ classes }: any) => (
  <div>
    <MarketsTable />
    <div className={classes.linkWrapper}>
      This site uses&nbsp;
      <a target="_blank" className={classes.link} href="https://www.kraken.com/en-us/help/api">Kraken API</a>
    </div>
  </div>
);

export default compose(
  withStyles(styles),
)(Markets);
