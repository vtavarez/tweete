import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  progressContainer: {
    position: "relative",
    height: 20,
    width: "100%",
    padding: "5px 100px"
  },
  progress: {
    borderRadius: 10
  }
});

const LinearLoader = props => {
  const { progressContainer, progress } = useStyles();
  return (
    <div className={progressContainer}>
      <LinearProgress className={progress} />
    </div>
  );
};

export default LinearLoader;
