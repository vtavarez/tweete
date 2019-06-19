import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LikeIconOutline from "@material-ui/icons/FavoriteBorder";
import LikeIconFilled from "@material-ui/icons/Favorite";
import ReplyIcon from "@material-ui/icons/Reply";
import TweetOptionsUserMenu from './TweetOptionsUserMenu';
import TweetOptionsRetweetMenu from './TweetOptionsRetweetMenu';

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
    let likeTweet = tweetLiked ? false:true;
    localStorage.setItem(
      JSON.stringify(props.id),
      JSON.stringify(likeTweet)
    );
    setTweetLiked(likeTweet);
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
        <TweetOptionsRetweetMenu fill={icon.fill} />
      </Grid>
      <Grid item xs={3}>
        <TweetOptionsUserMenu fill={icon.fill} />
      </Grid>
    </Grid>
  );
};

export default connect(null)(TweetOptions);
