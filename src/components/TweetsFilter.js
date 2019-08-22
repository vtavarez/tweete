import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";

const Search = withStyles(theme => ({
  width: "100%",
  height: 54,
  padding: "0 15px",
  backgroundColor: "#2d2c2f"
}))(Box);

const TweetsFilter = props => {
  return <Search />;
};

const mapStateToProps = state => ({
  tweets: state.tweets
});

export default connect(mapStateToProps)(TweetsFilter);
