import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  grid: {
    borderBottom: '1px solid #424242',
    padding: '5px 0px'
  },
  name: {
    color: theme.palette.primary.main
  },
  handle : {
    marginLeft: 5,
    color: theme.palette.grey[600],
    fontWeight: 300,
    fontSize: 12
  },
  avatar: {
    margin: '0px 0px 0px 32px',
    width: 34,
    height: 34
  }
}));

const TweetUsername = props => {
  const classes = useStyles();
  const { name, handle } = props;

  return (
   <Typography variant="subtitle3" className={classes.name}>
        {name}
      <span className={classes.handle}>
        {`@${handle}`}
      </span>
   </Typography>
  );
};

export default TweetUsername;