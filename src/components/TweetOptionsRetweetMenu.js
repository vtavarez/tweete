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
    paddingTop: 0,
    paddingBottom: 0
  },
  icon_button: {
    cursor: "default",
    "& svg": {
      fill: theme.palette.grey[700]
    },
    "&:hover": {
      "& svg": {
        fill: theme.palette.primary.main
      }
    }
  }
}));

const TweetOptionsRetweetMenu = props => {
  const { root, icon_button } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <IconButton
        aria-label="Retweet"
        aria-controls="retweet-options"
        aria-haspopup="true"
        size="small"
        onClick={e => setAnchorEl(e.currentTarget)}
        className={icon_button}
      >
        <Icon
          path={mdiTwitterRetweet}
          size={1}
          horizontal
          vertical
          rotate={180}
        />
      </IconButton>
      <Menu
        id="retweet-options"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onBackdropClick={() => setAnchorEl(null)}
        MenuListProps={{
          disablePadding: true
        }}
      >
        <MenuItem className={root}>Retweet to Followers</MenuItem>
        <MenuItem className={root}>Quote</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default connect(null)(TweetOptionsRetweetMenu);
