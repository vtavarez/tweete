import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import twitter from "twitter-text";
import TweetMedia from "./TweetMedia";

const useStyles = makeStyles(theme => ({
  tweetBody: {
    fontSize: props => props.fontSize || 14,
    color: theme.palette.text.secondary,
    userSelect: "none",
    whiteSpace: "pre-line",
    marginBottom: 5
  }
}));

const TweetBody = props => {
  let classes = useStyles(props);

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

    if (props.entities.urls.length > 0) {
      props.entities.urls.forEach(urlObj => {
        if (urlObj.expanded_url.includes("https://twitter.com/")) {
          tweet_text = tweet_text.replace(urlObj.url, "");
        }
      });
    }

    return twitter.autoLink(tweet_text, {
      urlEntities: props.entities.urls,
      usernameIncludeSymbol: true
    });
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
