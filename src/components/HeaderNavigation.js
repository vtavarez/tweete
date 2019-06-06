import React from "react";
import { connect } from "react-redux";

const HeaderNavigation = props => {
  return <div style={{ textTransform: 'capitalize', height: '200px' }}>Header {props.route}</div>;
};

const mapStateToProps = state => {
  return {
    route: state.route
  };
};

export default connect(mapStateToProps)(HeaderNavigation);
