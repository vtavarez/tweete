import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TweetUsername from "./TweetUsername";
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
  return (
    <TweetContainer color={"highlight"}>
      {props.retweet && (
        <Grid item xs={12}>
          <RetweeterDetails
            avatar={props.retweeter_avatar}
            handle={props.retweeter_handle}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <TweetUsername
          name={props.quoted_user.name}
          handle={props.quoted_user.screen_name}
          verified={props.quoted_user.verified}
          created={props.quoted_created}
          quoted={true}
          fontSize={13}
        />
        <TweetBody
          full_text={props.quoted_full_text}
          entities={props.quoted_entities}
          media={props.quoted_media}
          fontSize={12}
        />
      </Grid>
    </TweetContainer>
  );
};

export default Tweet;
