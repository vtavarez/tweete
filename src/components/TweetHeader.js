import React from "react";
import Typography from "@material-ui/core/Typography";
import { mdiCheckDecagram } from "@mdi/js";
import Icon from "@mdi/react";
import { makeStyles } from "@material-ui/core/styles";
import TweetCreatedAt from "./TweetCreatedAt";
import ReplyIcon from "@material-ui/icons/ForumOutlined";

const useStyles = makeStyles(theme => ({
  name: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    userSelect: "none",
    fontSize: props => props.fontSize || 14
  },
  handle: {
    marginLeft: 5,
    color: theme.palette.grey[500],
    fontWeight: 300,
    fontSize: props => props.fontSize - 1 || 13,
    userSelect: "none"
  },
  verified: {
    position: "relative",
    fill: theme.palette.text.primary,
    width: 15,
    height: 15,
    top: 3
  },
  reply: {
    position: "relative",
    display: "inline",
    float: "right",
    fill: theme.palette.grey[700],
    width: 15,
    height: 15,
    top: 3,
    transform: "translateX(-5px)"
  }
}));

const TweetHeader = props => {
  const classes = useStyles(props);
  const { name, handle, reply, verified, created, fontSize } = props;

  return (
    <Typography variant="subtitle2" className={classes.name}>
      {name}
      {verified && (
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
      <TweetCreatedAt created={created} fontSize={fontSize - 2} />
      {reply && <ReplyIcon className={classes.reply} />}
    </Typography>
  );
};

export default TweetHeader;
