import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LikeIconOutline from "@material-ui/icons/FavoriteBorder";
import LikeIconFilled from "@material-ui/icons/Favorite";
import ReplyIcon from "@material-ui/icons/Reply";
import UserIcon from "@material-ui/icons/PersonOutlined";
import { mdiTwitterRetweet } from "@mdi/js";
import Icon from "@mdi/react";

const useStyles = makeStyles(theme => ({
  fill: {
    fill: theme.palette.grey[50] 
  },
  selected: {
    fill: theme.palette.primary.main
  }
}));

const TweetOptions = props => {
  const icon = useStyles();
  const [tweetLiked, setTweetLiked] = useState(false);

  const likeTweet = e => {
    localStorage.setItem(
      JSON.stringify(props.id),
      JSON.stringify(true)
    );
    setTweetLiked(true);
  };

  useEffect(() => {
    if (localStorage.getItem(JSON.stringify(props.id))){
       setTweetLiked(JSON.parse(localStorage.getItem(JSON.stringify(props.id))));
    }
  },[props.id]);

  return (
    <Grid container alignItems="center">
      <Grid item xs={3}>
        <IconButton
          aria-label="Like"
          onClick={likeTweet}
        >
          { tweetLiked ? (
            <LikeIconFilled className={icon.selected} />
          ) : (
            <LikeIconOutline className={icon.fill} />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <IconButton aria-label="Reply">
          <ReplyIcon className={icon.fill} />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <IconButton aria-label="Retweet">
          <Icon
            path={mdiTwitterRetweet}
            size={1.2}
            horizontal
            vertical
            rotate={180}
            className={icon.fill}
          />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <IconButton aria-label="User-Options">
          <UserIcon className={icon.fill} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default connect(null)(TweetOptions);
