import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { mdiTooltipPlusOutline } from "@mdi/js";
import Icon from "@mdi/react";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  tweetButton: {
    marginLeft: "48px",
    "&:hover": {
      backgroundColor: "transparent"
    }
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
        path={mdiTooltipPlusOutline}
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
