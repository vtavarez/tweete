import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LikeIconOutline from "@material-ui/icons/FavoriteBorder";
import LikeIconFilled from "@material-ui/icons/Favorite";
import ReplyIcon from "@material-ui/icons/Reply";
import TweetOptionsUserMenu from "./TweetOptionsUserMenu";
import TweetOptionsRetweetMenu from "./TweetOptionsRetweetMenu";

const useStyles = makeStyles(theme => ({
  fill: {
    fill: theme.palette.grey[700]
  },
  selected: {
    fill: theme.palette.primary.main
  }
}));

const TweetOptions = props => {
  const { fill, selected } = useStyles();
  const [tweetLiked, setTweetLiked] = useState(false);

  const onLikeTweet = e => {
    let likeState = tweetLiked ? false : true;
    localStorage.setItem(JSON.stringify(props.id), JSON.stringify(likeState));
    setTweetLiked(likeState);
  };

  useEffect(() => {
    if (localStorage.getItem(JSON.stringify(props.id))) {
      setTweetLiked(JSON.parse(localStorage.getItem(JSON.stringify(props.id))));
    }
  }, [props.id]);

  return (
    <Grid container alignItems="center">
      <Grid item xs={3}>
        <IconButton aria-label="Like" onClick={onLikeTweet} size="small">
          {tweetLiked ? (
            <LikeIconFilled className={selected} />
          ) : (
            <LikeIconOutline className={fill} />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <IconButton aria-label="Reply" size="small">
          <ReplyIcon className={fill} />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <TweetOptionsRetweetMenu fill={fill} />
      </Grid>
      <Grid item xs={3}>
        <TweetOptionsUserMenu fill={fill} user={"user"} />
      </Grid>
    </Grid>
  );
};

export default connect(null)(TweetOptions);
