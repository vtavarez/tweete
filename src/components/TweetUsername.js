import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  name: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    userSelect: "none"
  },
  handle: {
    marginLeft: 5,
    color: theme.palette.grey[500],
    fontWeight: 300,
    fontSize: 12,
    userSelect: "none"
  }
}));

const TweetUsername = props => {
  const classes = useStyles();
  const { name, handle } = props;

  return (
    <Typography variant="subtitle2" className={classes.name}>
      {name}
      <span className={classes.handle}>{`@${handle}`}</span>
    </Typography>
  );
};

export default TweetUsername;
