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
  }
}));

const TweetContainer = withStyles({
  root: {
    borderBottom: "1px solid #424242",
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
  const { avatar } = useStyles();

  return (
    <TweetContainer>
      <Grid item xs={2}>
        <Avatar alt="user avatar" src={props.avatar} className={avatar} />
      </Grid>

      <Grid item xs={10}>
        {props.retweet && (
          <RetweeterDetails
            avatar={props.retweeter_avatar}
            handle={props.retweeter_handle}
          />
        )}
        <TweetUsername
          name={props.name}
          handle={props.handle}
          verified={props.verified}
        />
        <TweetBody full_text={props.full_text} entities={props.entities} />
        <TweetOptions {...props} />
      </Grid>
    </TweetContainer>
  );
};

export default connect(null)(Tweet);
