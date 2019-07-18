import React, { useState } from "react";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { mdiTwitter } from "@mdi/js";
import Icon from "@mdi/react";
import { ReactComponent as Logo } from "../logo.svg";

const StyledContainer = withStyles({
  root: {
    position: "absolute",
    backgroundColor: "#2e2c29",
    width: "100vw",
    height: "100vh"
  }
})(Container);

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
    width: 220,
    height: "auto"
  },
  button: {
    textTransform: "capitalize",
    color: theme.palette.text.secondary
  },
  buttonIcon: {
    fill: theme.palette.text.secondary,
    marginRight: 10
  },
  gridContainer: {
    height: "100vh"
  }
}));

const LoginWithTwitter = props => {
  const [open] = useState(true);
  const [loading, setLoading] = useState(false);
  const { logo, button, buttonIcon, gridContainer } = useStyles();

  window.ipcRenderer.on("twitter-oauth-token", (event, token) => {
    console.log(token);
  });

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
              onClick={() =>
                window.ipcRenderer.send("twitter-oauth", "getToken")
              }
            >
              <Icon
                path={mdiTwitter}
                size={1}
                horizontal
                vertical
                rotate={180}
                className={buttonIcon}
              />
              Login with Twitter
            </Button>
          </Grid>
        </Grid>
      </StyledContainer>
    </Modal>
  );
};

export default connect(null)(LoginWithTwitter);
