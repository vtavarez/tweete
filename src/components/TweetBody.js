import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import twitter from "twitter-text";

const useStyles = makeStyles(theme => ({
  tweetBody: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    userSelect: "none"
  }
}));

const TweetBody = props => {
  const classes = useStyles();
  return (
    <Box>
      <Typography
        className={classes.tweetBody}
        dangerouslySetInnerHTML={{
          __html: twitter.autoLink(props.full_text, {
            urlEntities: props.entities.urls
          })
        }}
        paragraph
      />
    </Box>
  );
};

export default TweetBody;
