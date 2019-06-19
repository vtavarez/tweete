import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { mdiTwitterRetweet } from "@mdi/js";
import Icon from "@mdi/react";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 36,
    fontSize: 14,
    "&$disabled": {
      color: theme.palette.text.secondary
    }
  },
  disabled: {}
}));

const TweetOptionsRetweetMenu = props => {
  const { root } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  return (
    <React.Fragment>
      <IconButton
        aria-label="Retweet"
        aria-controls="retweet-options"
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <Icon
          path={mdiTwitterRetweet}
          size={1.2}
          horizontal
          vertical
          rotate={180}
          className={props.fill}
        />
      </IconButton>
      <Menu
        id="retweet-options"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onBackdropClick={() => setAnchorEl(null)}
      >
        <MenuItem className={root}>
          Retweet
        </MenuItem>
        <MenuItem className={root}>
          Quote
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default connect(null)(TweetOptionsRetweetMenu);
