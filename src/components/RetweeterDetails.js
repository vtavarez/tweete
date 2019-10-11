import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { mdiTwitterRetweet } from "@mdi/js";
import Icon from "@mdi/react";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  container: {
    transform: "translateX(80px)"
  },
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
  screen_name: {
    color: theme.palette.grey[500],
    fontWeight: 300,
    fontSize: 12,
    userSelect: "none",
    marginLeft: 5
  }
}));

const RetweeterDetails = ({
  retweeter: { profile_image_url_https, screen_name }
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.box}>
        <Icon
          path={mdiTwitterRetweet}
          horizontal
          vertical
          rotate={180}
          className={classes.icon}
        />
      </Box>
      <Box className={classes.box}>
        <Avatar
          alt="retweet avatar"
          src={profile_image_url_https}
          className={classes.avatar}
        />
      </Box>
      <Box className={classes.box}>
        <span className={classes.screen_name}>{`@${screen_name}`}</span>
      </Box>
    </Box>
  );
};

export default RetweeterDetails;
