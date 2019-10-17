import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LikeIconOutline from "@material-ui/icons/FavoriteBorder";
import LikeIconFilled from "@material-ui/icons/Favorite";
import ReplyIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import TweetOptionsUserMenu from "./TweetOptionsUserMenu";
import TweetOptionsRetweetMenu from "./TweetOptionsRetweetMenu";
import { likeTweet, unLikeTweet } from "../actions";

const useStyles = makeStyles(theme => ({
  grid_container: {
    transform: "translateX(-10px)",
    marginBottom: 5,
    marginTop: 5
  },
  grid_item: {
    paddingLeft: 10
  },
  icon_button: {
    cursor: "default",
    "& svg": {
      fill: theme.palette.grey[700],
      width: 22,
      height: 22
    },
    "&:hover": {
      "& svg": {
        fill: theme.palette.primary.main
      }
    }
  },
  selected_tweet: {
    "& svg": {
      fill: theme.palette.primary.main
    }
  },
  liked_icon_button: {
    cursor: "default",
    "& svg": {
      fill: theme.palette.secondary.main,
      width: 22,
      height: 22
    }
  },
  reply_icon: {
    transform: "scaleX(-1) rotate(180deg)"
  }
}));

const TweetOptions = ({
  tweetId,
  user,
  liked,
  likeTweet,
  unLikeTweet,
  selected
}) => {
  const {
    grid_item,
    grid_container,
    selected_tweet,
    liked_icon_button,
    reply_icon,
    icon_button
  } = useStyles();

  const tweetWasLiked = JSON.parse(sessionStorage.getItem(tweetId)) || null;

  const [currentLikeState, setCurrentLikeState] = useState(liked);

  const toggleLikeTweet = e => {
    currentLikeState || tweetWasLiked
      ? unLikeTweet(tweetId)
      : likeTweet(tweetId);
    sessionStorage.setItem(tweetId, !currentLikeState.toString());
    setCurrentLikeState(!currentLikeState);
  };

  return (
    <Grid container className={grid_container} alignItems="center">
      <Grid item xs={2} className={grid_item}>
        <IconButton
          className={`${
            currentLikeState || tweetWasLiked ? liked_icon_button : icon_button
          } ${!currentLikeState &&
            !tweetWasLiked &&
            selected &&
            selected_tweet}`}
          aria-label="Like"
          onClick={toggleLikeTweet}
          size="small"
        >
          {currentLikeState || tweetWasLiked ? (
            <LikeIconFilled />
          ) : (
            <LikeIconOutline />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={2} className={grid_item}>
        <IconButton
          className={`${icon_button} ${selected && selected_tweet}`}
          aria-label="Reply"
          size="small"
        >
          <ReplyIcon className={reply_icon} />
        </IconButton>
      </Grid>
      <Grid item xs={2} className={grid_item}>
        <TweetOptionsRetweetMenu selected={selected} />
      </Grid>
      <Grid item xs={2} className={grid_item}>
        <TweetOptionsUserMenu user={user} selected={selected} />
      </Grid>
    </Grid>
  );
};

export default connect(
  null,
  {
    likeTweet,
    unLikeTweet
  }
)(TweetOptions);
