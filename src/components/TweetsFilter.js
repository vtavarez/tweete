import React from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const Search = withStyles(theme => ({
  
}))(Box);

const TweetsFilter = (props) => {
 return (

 )
};

const mapStateToProps = state => ({
  tweets: state.tweets
});

export default connect(mapStateToProps)(TweetsFilter);