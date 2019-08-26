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
    paddingBottom: 0,
    cursor: "default"
  },
  enabled: {
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

const TweetOptionsUserMenu = ({ user }) => {
  const { root, enabled } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(user.notifications);
  const [isFollowing, setIsFollowing] = useState(user.following);
  const open = Boolean(anchorEl);

  const notificationsHandler = e => {
    setNotifications(!notifications);
    setAnchorEl(null);
  };

  const isFollowingHandler = e => {
    setIsFollowing(!isFollowing);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        className={enabled}
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
        <MenuItem divider disabled className={root}>
          {user.follow_request_sent
            ? `@${user.screen_name} is following you.`
            : `@${user.screen_name} is not following you.`}
        </MenuItem>
        <MenuItem className={root}>Public Reply</MenuItem>
        <MenuItem divider disabled={false} className={root}>
          Direct Message
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          Add/Remove from Lists
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          Disable Retweets
        </MenuItem>
        <MenuItem
          onClick={notificationsHandler}
          disabled={false}
          className={root}
        >
          {notifications ? "Disable Notifications" : "Enable Notifications"}
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          Open Profile in Browser
        </MenuItem>
        <MenuItem
          onClick={isFollowingHandler}
          disabled={false}
          className={root}
        >
          {isFollowing
            ? `Unfollow @${user.screen_name}`
            : `Follow @${user.screen_name}`}
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          {`Mute @${user.screen_name}`}
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          {`Block @${user.screen_name}`}
        </MenuItem>
        <MenuItem disabled={false} className={root}>
          Report for Spam...
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default connect(null)(TweetOptionsUserMenu);
