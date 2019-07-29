import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import UserIcon from "@material-ui/icons/PersonOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 36,
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0
  },
  icon_button: {
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

const TweetOptionsUserMenu = ({ user }) => {
  const classes = useStyles();
  const { root, icon_button } = classes;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <IconButton
        className={icon_button}
        aria-label="User Options"
        aria-controls="user-options"
        aria-haspopup="true"
        size="small"
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <UserIcon />
      </IconButton>

      <Menu
        id="user-options"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onBackdropClick={() => setAnchorEl(null)}
        MenuListProps={{
          disablePadding: true
        }}
      >
        <MenuItem divider disabled classes={classes}>
          {`@${user} is not following you.`}
        </MenuItem>
        <MenuItem className={root}>Reply</MenuItem>
        <MenuItem divider className={root}>
          Direct Message
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          Add/Remove from Lists
        </MenuItem>
        <MenuItem disabled={true} className={root}>
          Disable Retweets
        </MenuItem>
        <MenuItem disabled={true} className={root}>
          Enable Notifications
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          Open Profile in Browser
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          Unfollow
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          Mute
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          Block User...
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          Block and Report for Spam...
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default connect(null)(TweetOptionsUserMenu);
