import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LikeIconOutline from "@material-ui/icons/FavoriteBorder";
import LikeIconFilled from "@material-ui/icons/Favorite";
import ReplyIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import TweetOptionsUserMenu from "./TweetOptionsUserMenu";
import TweetOptionsRetweetMenu from "./TweetOptionsRetweetMenu";

const useStyles = makeStyles(theme => ({
  grid_container: {
    transform: "translateX(-10px)",
    marginBottom: 5
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
  selected_icon: {
    fill: theme.palette.primary.main + "!important"
  },
  reply_icon: {
    transform: "scaleX(-1) rotate(180deg)"
  }
}));

const TweetOptions = props => {
  const {
    grid_item,
    grid_container,
    selected_icon,
    reply_icon,
    icon_button
  } = useStyles();
  const [tweetLiked, setTweetLiked] = useState(false);

  const onLikeTweet = e => {
    let likeState = !tweetLiked;
    localStorage.setItem(JSON.stringify(props.id), JSON.stringify(likeState));
    setTweetLiked(likeState);
  };

  useEffect(() => {
    if (localStorage.getItem(JSON.stringify(props.id))) {
      setTweetLiked(JSON.parse(localStorage.getItem(JSON.stringify(props.id))));
    }
  }, [props.id]);

  return (
    <Grid className={grid_container} container alignItems="center">
      <Grid item xs={2} className={grid_item}>
        <IconButton
          className={icon_button}
          aria-label="Like"
          onClick={onLikeTweet}
          size="small"
        >
          {tweetLiked ? (
            <LikeIconFilled className={selected_icon} />
          ) : (
            <LikeIconOutline />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={2} className={grid_item}>
        <IconButton className={icon_button} aria-label="Reply" size="small">
          <ReplyIcon className={reply_icon} />
        </IconButton>
      </Grid>
      <Grid item xs={2} className={grid_item}>
        <TweetOptionsRetweetMenu />
      </Grid>
      <Grid item xs={2}>
        <TweetOptionsUserMenu user={"user"} />
      </Grid>
    </Grid>
  );
};

export default connect(null)(TweetOptions);
