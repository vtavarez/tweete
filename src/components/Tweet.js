import React from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TweetUsername from "./TweetUsername";
import TweetBody from "./TweetBody";
import TweetOptions from "./TweetOptions";

const styledBy = (property, mapping) => props => mapping[props[property]];

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: "0px 0px 0px 17px",
    width: 44,
    height: 44
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
        <Avatar alt="user avatar" src={null} className={avatar} />
      </Grid>

      <Grid item xs={10}>
        <TweetUsername name={"Username"} handle={"username"} />
        <TweetBody />
        <TweetOptions {...props} />
      </Grid>
    </TweetContainer>
  );
};

export default connect(null)(Tweet);
