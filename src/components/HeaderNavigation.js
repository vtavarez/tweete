import React from "react";
import { connect } from "react-redux";

const HeaderNavigation = props => {
  const routeCapitalized = props.route[0].toUpperCase() + props.route.slice(1);
  return <div>Header {routeCapitalized}</div>;
};

const mapStateToProps = state => {
  return {
    route: state.route
  };
};

export default connect(mapStateToProps)(HeaderNavigation);
