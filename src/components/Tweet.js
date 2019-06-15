import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TweetUsername from "./TweetUsername";
import TweetBody from "./TweetBody";
import TweetOptions from "./TweetOptions";

const useStyles = makeStyles(theme => ({
  grid: {
    borderBottom: "1px solid #424242",
    padding: "5px 10px"
  },
  name: {
    color: theme.palette.grey[300]
  },
  handle: {
    marginLeft: 5,
    color: theme.palette.grey[600],
    fontWeight: 300,
    fontSize: 12
  },
  avatar: {
    margin: "0px 0px 0px 17px",
    width: 44,
    height: 44
  }
}));

const Tweet = props => {
  const classes = useStyles();

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={2}>
        <Avatar alt="user avatar" src={null} className={classes.avatar} />
      </Grid>

      <Grid item xs={10}>
        <Grid container>
          <TweetUsername name={"Username"} handle={"username"} />
          <TweetBody />
        </Grid>
        <Grid container>
          <TweetOptions />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect(null)(Tweet);
