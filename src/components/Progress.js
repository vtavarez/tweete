import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  progressContainer: {
    position: "relative",
    top: "50%",
    marginTop: "-20px"
  },
  progress: {
    position: "absolute",
    left: "50%",
    marginLeft: "-20px"
  }
});

const Progress = props => {
  const classes = useStyles();
  return (
    <div className={classes.progressContainer}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

export default Progress;
