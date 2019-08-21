import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ComposeTweetButton from "./ComposeTweetButton";

const useStyles = makeStyles(theme => ({
  grid: {
    position: "fixed",
    top: 0,
    width: "100%",
    maxWidth: 500,
    zIndex: "2",
    backgroundColor: "#2d2c2f"
  },
  title: {
    textAlign: "center",
    textTransform: "capitalize",
    color: theme.palette.grey[300],
    fontWeight: 500,
    userSelect: "none"
  },
  avatar: {
    margin: "10px 0px 10px 32px",
    width: 34,
    height: 34
  }
}));

const HeaderNavigation = ({ user, route }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={classes.grid}>
      <Grid item xs={3}>
        <Avatar
          alt="user avatar"
          src={user ? user.profile_image_url_https : null}
          className={classes.avatar}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" className={classes.title}>
          {route}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <ComposeTweetButton />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  route: state.route,
  user: state.user
});

export default connect(mapStateToProps)(HeaderNavigation);
