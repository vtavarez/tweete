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


let highlight;

const useStyles = makeStyles(theme => ({
  fill: {
    fill: highlight ? theme.palette.primary.main : theme.palette.grey[700]
  },
  selected: {
    fill: theme.palette.primary.main
  }
}));

const TweetOptions = props => {
  const classes = useStyles();
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
    if (localStorage.getItem(JSON.stringify(props.id))) {
      setTweetLiked(
        JSON.parse(localStorage.getItem(JSON.stringify(props.id)))
      );
    }
  }, [props.id]);

  return (
    <Grid container alignItems="center">
      <Grid item xs={3}>
        <IconButton aria-label="Like" onClick={likeTweet} size="small">
          {tweetLiked ? (
            <LikeIconFilled className={classes.selected} />
          ) : (
            <LikeIconOutline className={classes.fill} />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <IconButton aria-label="Reply" size="small">
          <ReplyIcon className={classes.fill} />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <TweetOptionsRetweetMenu fill={classes.fill} />
      </Grid>
      <Grid item xs={3}>
        <TweetOptionsUserMenu fill={classes.fill} />
      </Grid>
    </Grid>
  );
};

export default connect(null)(TweetOptions);
