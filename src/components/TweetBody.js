import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tweetBody: {
    fontSize: 13,
    color: 'white'
  }
}));

const TweetBody = props => {
  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.tweetBody} paragraph>
        Ultrices neque magna commodo nulla facilisis faucibus metus porta vulputate, est taciti nisl potenti sociosqu justo condimentum. Bibendum nunc sollicitudin per diam auctor ipsum fermentum, mus placerat hendrerit venenatis cubilia senectus vestibulum ut, est sociis blandit. 
      </Typography>
    </Box>
  );
};

export default TweetBody;