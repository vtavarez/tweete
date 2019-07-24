import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  tweetBody: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    userSelect: "none"
  }
}));

const TweetBody = props => {
  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.tweetBody} paragraph>
        {props.text}
      </Typography>
    </Box>
  );
};

export default TweetBody;
