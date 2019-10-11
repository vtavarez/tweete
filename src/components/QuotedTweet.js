import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TweetHeader from "./TweetHeader";
import TweetBody from "./TweetBody";

const styledBy = (property, mapping) => props => mapping[props[property]];

const TweetContainer = withStyles({
  root: {
    padding: "10px",
    backgroundColor: styledBy("color", {
      default: "inherit",
      highlight: "rgba(255, 255, 255, .05)"
    }),
    borderRadius: 5,
    margin: "5px 0"
  }
})(({ classes, color, ...other }) => (
  <Grid container className={classes.root} {...other} />
));

const QuotedTweet = ({ user, fullText, entities, media, created, reply }) => {
  return (
    <TweetContainer color={"highlight"}>
      <Grid item xs={12}>
        <TweetHeader
          user={user}
          created={created}
          fontSize={13}
          reply={reply}
          quoted
        />
        <TweetBody
          fullText={fullText}
          entities={entities}
          media={media}
          fontSize={12}
          quoted
        />
      </Grid>
    </TweetContainer>
  );
};

export default QuotedTweet;
