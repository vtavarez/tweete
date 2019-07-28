import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { mdiTwitterRetweet } from "@mdi/js";
import Icon from "@mdi/react";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  box: {
    display: "inline-block",
    verticalAlign: "top"
  },
  icon: {
    fill: theme.palette.primary.main,
    width: 20,
    height: 20
  },
  avatar: {
    width: 18,
    height: 18,
    marginLeft: 5
  },
  handle: {
    color: theme.palette.grey[500],
    fontWeight: 300,
    fontSize: 12,
    userSelect: "none",
    marginLeft: 5
  }
}));

const RetweeterDetails = props => {
  const { box, icon, avatar, handle } = useStyles();

  return (
    <Box>
      <Box className={box}>
        <Icon
          path={mdiTwitterRetweet}
          horizontal
          vertical
          rotate={180}
          className={icon}
        />
      </Box>
      <Box className={box}>
        <Avatar alt="retweet avatar" src={props.avatar} className={avatar} />
      </Box>
      <Box className={box}>
        <span className={handle}>{`@${props.handle}`}</span>
      </Box>
    </Box>
  );
};

export default RetweeterDetails;
