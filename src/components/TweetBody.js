import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import twitter from "twitter-text";
import TweetMedia from "./TweetMedia";

const useStyles = makeStyles(theme => ({
  tweetBody: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    userSelect: "none",
    whiteSpace: "pre-line",
    marginBottom: 5
  }
}));

const TweetBody = props => {
  const classes = useStyles();

  const linkTo = event => {
    event.preventDefault();
    console.log(event.target.getAttribute("data-screen-name"));
  };

  const tweetParser = () => {
    let tweet_text = props.full_text;

    if (props.entities.media) {
      props.entities.media.forEach(media => {
        if (tweet_text.includes(media.url)) {
          tweet_text = tweet_text.replace(media.url, "");
        }
      });
    }

    const tweet = twitter.autoLink(tweet_text, {
      urlEntities: props.entities.urls
    });

    return tweet;
  };

  return (
    <Box>
      <Typography
        onClick={linkTo}
        className={classes.tweetBody}
        dangerouslySetInnerHTML={{
          __html: tweetParser()
        }}
        paragraph
      />
      {props.entities.media && <TweetMedia media={props.media} />}
    </Box>
  );
};

export default TweetBody;
