import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TweetHeader from "./TweetHeader";
import TweetBody from "./TweetBody";
import RetweeterDetails from "./RetweeterDetails";

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

const Tweet = props => {
  const {
    retweeterAvatar,
    retweeterHandle,
    quotedUser,
    quotedFullText,
    quotedEntities,
    quotedMedia,
    quotedCreated,
    quotedReply
  } = props;

  return (
    <TweetContainer color={"highlight"}>
      {props.retweet && (
        <Grid item xs={12}>
          <RetweeterDetails avatar={retweeterAvatar} handle={retweeterHandle} />
        </Grid>
      )}
      <Grid item xs={12}>
        <TweetHeader
          name={quotedUser.name}
          handle={quotedUser.screen_name}
          verified={quotedUser.verified}
          created={quotedCreated}
          quoted={true}
          fontSize={13}
          reply={quotedReply}
        />
        <TweetBody
          fullText={quotedFullText}
          entities={quotedEntities}
          media={quotedMedia}
          fontSize={12}
        />
      </Grid>
    </TweetContainer>
  );
};

export default Tweet;
