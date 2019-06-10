import React from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: theme.palette.grey[300],
    fontWeight: 500
  },
  avatar: {
    margin: '10px 0px 10px 36px',
  }
}));

const HeaderNavigation = props => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={3}>
        <Avatar alt="user avatar" src={null} className={classes.avatar} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" className={classes.root}>
          { props.route }
        </Typography>
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid>
  );

}

const mapStateToProps = state => {
  return {
    route: state.route
  };
};

export default connect(mapStateToProps)(HeaderNavigation);