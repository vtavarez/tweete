import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from '@material-ui/core/ListItem';
import IconButton from "@material-ui/core/IconButton";
import UserIcon from "@material-ui/icons/PersonOutlined";

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

const TweetOptionsUserMenu = props => {
  const classes = useStyles();
  const { root } = classes;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <IconButton
        aria-label="User Options"
        aria-controls="user-options"
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <UserIcon className={props.fill} />
      </IconButton>

      <Menu
        id="user-options"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onBackdropClick={() => setAnchorEl(null)}
      >
        <ListItem disabled classes={classes}>
          {`@${props.user} is not following you.`}
        </ListItem>
        <MenuItem className={root}>Reply</MenuItem>
        <MenuItem className={root}>Direct Message</MenuItem>
        <MenuItem className={root}>Add/Remove from Lists</MenuItem>
        <MenuItem className={root}>Disable Retweets</MenuItem>
        <MenuItem className={root}>Enable Notifications</MenuItem>
        <MenuItem className={root}>Open Profile in Browser</MenuItem>
        <MenuItem className={root}>Unfollow</MenuItem>
        <MenuItem className={root}>Mute</MenuItem>
        <MenuItem className={root}>Block User...</MenuItem>
        <MenuItem className={root}>
          Block and Report for Spam...
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default connect(null)(TweetOptionsUserMenu);
