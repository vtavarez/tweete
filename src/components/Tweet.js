import React from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TweetUsername from "./TweetUsername";
import TweetBody from "./TweetBody";
import TweetOptions from "./TweetOptions";
import RetweeterDetails from "./RetweeterDetails";

const styledBy = (property, mapping) => props => mapping[props[property]];

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: "0px 0px 0px 17px",
    width: 45,
    height: 45
  },
  tweet_details: {
    borderBottom: "1px solid #424242"
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
    return props.avatar.replace("normal", "bigger");
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
          name={props.name}
          handle={props.handle}
          verified={props.verified}
          created={props.created}
        />
        <TweetBody full_text={props.full_text} entities={props.entities} />
        <TweetOptions {...props} />
      </Grid>
    </TweetContainer>
  );
};

export default connect(null)(Tweet);
