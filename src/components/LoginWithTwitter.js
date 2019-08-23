import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/styles";
import { beginOAuth, fetchUser, fetchHomeTimeline } from "../actions";
import Modal from "@material-ui/core/Modal";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { mdiTwitter } from "@mdi/js";
import Icon from "@mdi/react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ReactComponent as Logo } from "../logo.svg";

const StyledContainer = withStyles(theme => ({
  root: {
    position: "absolute",
    backgroundColor: theme.palette.grey[900],
    width: "100vw",
    height: "100vh"
  }
}))(Container);

const Title = withStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    textTransform: "capitalize",
    fontSize: 62,
    fontWeight: 900,
    letterSpacing: 1,
    margin: 0
  }
}))(Box);

const useStyles = makeStyles(theme => ({
  logo: {
    width: 240,
    height: "auto"
  },
  button: {
    textTransform: "capitalize",
    color: theme.palette.text.secondary,
    width: 212,
    height: 42
  },
  buttonIcon: {
    fill: theme.palette.text.secondary,
    marginRight: 10
  },
  progress: {
    margin: "0 auto",
    color: theme.palette.text.secondary
  },
  gridContainer: {
    height: "100vh"
  }
}));

const LoginWithTwitter = ({
  oauth,
  beginOAuth,
  fetchUser,
  fetchHomeTimeline
}) => {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { logo, button, buttonIcon, progress, gridContainer } = useStyles();

  useEffect(() => {
    if (oauth === "oauth-completed") {
      setIsLoading(false);
      setOpen(false);
    }

    if (localStorage.getItem("authenticated") && !oauth) {
      setIsLoading(false);
      setOpen(false);
      fetchUser();
      fetchHomeTimeline();
    }

    if (oauth === "oauth-cancelled") {
      setIsLoading(false);
    }
  }, [oauth, fetchUser, fetchHomeTimeline]);

  const oAuthFlow = () => {
    beginOAuth();
    setIsLoading(true);
  };

  return (
    <Modal
      aria-labelledby="login-with-twitter"
      aria-describedby="login-"
      disableEscapeKeyDown
      disableBackdropClick
      open={open}
    >
      <StyledContainer maxWidth="xl">
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={6}
          justify="center"
          className={gridContainer}
        >
          <Grid item>
            <Title component="h1">tweete</Title>
          </Grid>
          <Grid item>
            <Logo className={logo} />
          </Grid>
          <Grid item>
            <Button
              className={button}
              variant="contained"
              color="primary"
              size="large"
              onClick={oAuthFlow}
            >
              {isLoading ? (
                <CircularProgress className={progress} size={24} />
              ) : (
                <React.Fragment>
                  <Icon
                    path={mdiTwitter}
                    size={1}
                    horizontal
                    vertical
                    rotate={180}
                    className={buttonIcon}
                  />
                  Login with Twitter
                </React.Fragment>
              )}
            </Button>
          </Grid>
        </Grid>
      </StyledContainer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  oauth: state.oauth
});

export default connect(
  mapStateToProps,
  { fetchUser, fetchHomeTimeline, beginOAuth }
)(LoginWithTwitter);
