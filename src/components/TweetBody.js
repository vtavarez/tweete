import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import twitter from "twitter-text";
import TweetMedia from "./TweetMedia";

// TODO handle clicked links

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
  const { fullText, entities, media } = props;

  const linkTo = e => {
    e.preventDefault();
    console.log(e.target.getAttribute("data-screen-name"));
  };

  const tweetParser = () => {
    let tweetText = fullText;

    if (entities.media) {
      entities.media.forEach(media => {
        if (tweetText.includes(media.url)) {
          tweetText = tweetText.replace(media.url, "");
        }
      });
    }

    if (entities.urls.length > 0) {
      entities.urls.forEach(urlObj => {
        if (urlObj.expanded_url.includes("https://twitter.com/")) {
          tweetText = tweetText.replace(urlObj.url, "");
        }
      });
    }

    return twitter.autoLink(tweetText, {
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
      {entities.media && <TweetMedia media={media} />}
    </Box>
  );
};

export default TweetBody;
