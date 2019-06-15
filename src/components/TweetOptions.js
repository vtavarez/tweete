import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LikeIcon from "@material-ui/icons/FavoriteBorder";
import ReplyIcon from "@material-ui/icons/Reply";
import UserIcon from "@material-ui/icons/PersonOutlined";
import { mdiTwitterRetweet } from "@mdi/js";
import Icon from "@mdi/react";

const useStyles = makeStyles(theme => ({
  icon: {
    fill: theme.palette.grey[400]
  }
}));

const TweetOptions = props => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item xs={3}>
        <IconButton size="small" aria-label="Like">
          <LikeIcon className={classes.icon} />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <IconButton size="small" aria-label="Reply">
          <ReplyIcon className={classes.icon} />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <IconButton size="small" aria-label="Retweet">
          <Icon
            path={mdiTwitterRetweet}
            size={1.2}
            horizontal
            vertical
            rotate={180}
            className={classes.icon}
          />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <IconButton size="small" aria-label="User-Options">
          <UserIcon className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default connect(null)(TweetOptions);
