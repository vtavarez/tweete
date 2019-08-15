import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { mdiMessagePlus } from "@mdi/js";
import Icon from "@mdi/react";
import IconButton from "@material-ui/core/IconButton";

// TODO dispatch action to create new browswer window with tweet creation component

const useStyles = makeStyles(theme => ({
  tweetButton: {
    marginLeft: "48px",
    "&:hover": {
      backgroundColor: "transparent"
    },
    cursor: "default"
  },
  tweetIcon: {
    fill: theme.palette.grey[400],
    "&:hover": {
      fill: theme.palette.primary.main
    }
  }
}));

const ComposeTweetButton = props => {
  const classes = useStyles();

  return (
    <IconButton className={classes.tweetButton}>
      <Icon
        path={mdiMessagePlus}
        size={1.2}
        horizontal
        vertical
        rotate={180}
        className={classes.tweetIcon}
      />
    </IconButton>
  );
};

export default connect(null)(ComposeTweetButton);
