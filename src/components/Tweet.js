import React from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TweetUsername from "./TweetUsername";
import TweetBody from "./TweetBody";
import TweetOptions from "./TweetOptions";
import RetweeterDetails from "./RetweeterDetails";
import QuotedTweet from "./QuotedTweet";

const styledBy = (property, mapping) => props => mapping[props[property]];

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: "0px 0px 0px 17px",
    width: 45,
    height: 45
  },
  tweet_details: {
    borderBottom: "1px solid rgba(66,66,66,.3)"
  }
}));

const TweetContainer = withStyles({
  root: {
    padding: "5px 10px",
    backgroundColor: styledBy("color", {
      default: "inherit",
      highlight: "rgba(255, 255, 255, .05)"
    })
  }
})(({ classes, color, ...other }) => (
  <Grid container className={classes.root} {...other} />
));

const Tweet = props => {
  const { avatar, tweet_details } = useStyles();

  const higherResAavatar = () => {
    return props.user.profile_image_url_https.replace("_normal", "");
  };

  return (
    <TweetContainer>
      {props.retweet && (
        <Grid item xs={12}>
          <RetweeterDetails
            avatar={props.retweeter_avatar}
            handle={props.retweeter_handle}
          />
        </Grid>
      )}
      <Grid item xs={2}>
        <Avatar alt="user avatar" src={higherResAavatar()} className={avatar} />
      </Grid>

      <Grid className={tweet_details} item xs={10}>
        <TweetUsername
          name={props.user.name}
          handle={props.user.screen_name}
          verified={props.user.verified}
          created={props.created}
        />
        <TweetBody
          full_text={props.full_text}
          entities={props.entities}
          media={props.media}
        />
        {props.quoted && (
          <QuotedTweet
            quoted_full_text={props.quoted_full_text}
            quoted_entities={props.quoted_entities}
            quoted_media={props.quoted_media}
            quoted_created={props.quoted_created}
            quoted_user={props.quoted_user}
          />
        )}
        <TweetOptions {...props} />
      </Grid>
    </TweetContainer>
  );
};

export default connect(null)(Tweet);
