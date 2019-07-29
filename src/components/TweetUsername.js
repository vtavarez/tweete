import React from "react";
import Typography from "@material-ui/core/Typography";
import { mdiCheckDecagram } from "@mdi/js";
import Icon from "@mdi/react";
import { makeStyles } from "@material-ui/core/styles";
import TweetCreatedAt from "./TweetCreatedAt";

const useStyles = makeStyles(theme => ({
  name: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    userSelect: "none",
    fontSize: 14
  },
  handle: {
    marginLeft: 5,
    color: theme.palette.grey[500],
    fontWeight: 300,
    fontSize: 13,
    userSelect: "none"
  },
  verified: {
    position: "relative",
    fill: theme.palette.text.primary,
    width: 15,
    height: 15,
    top: 3
  }
}));

const TweetUsername = props => {
  const classes = useStyles();
  const { name, handle } = props;

  return (
    <Typography variant="subtitle2" className={classes.name}>
      {name}
      {props.verified && (
        <span className={classes.handle}>
          <Icon
            path={mdiCheckDecagram}
            horizontal
            vertical
            rotate={180}
            className={classes.verified}
          />
        </span>
      )}
      <span className={classes.handle}>{`@${handle}`}</span>
      <TweetCreatedAt created={props.created} />
    </Typography>
  );
};

export default TweetUsername;
