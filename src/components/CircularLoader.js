import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  progressContainer: {
    position: "relative",
    height: "100vh"
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-20px",
    marginLeft: "-20px"
  }
});

const CircularLoader = props => {
  const classes = useStyles();
  return (
    <div className={classes.progressContainer}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

export default CircularLoader;
