import React, { useState } from "react";
import { connect } from "react-redux";
import { changeRoute } from "../actions";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";
import MentionsIcon from "@material-ui/icons/AlternateEmail";
import MessagesIcon from "@material-ui/icons/Mail";
import SearchIcon from "@material-ui/icons/Search";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FilterIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";

const StyledBadge = withStyles(theme => ({
  badge: {
    top: "4px"
  }
}))(Badge);

const FooterNavigation = props => {
  const [homeBadgeVisibility, setHomeBadgeVisibility] = useState(false);
  const [mentionsBadgeVisibility, setMentionsBadgeVisibility] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleRoute = (event, newValue) => {
    switch (newValue) {
      case "home":
        props.changeRoute("/", newValue);
        setHomeBadgeVisibility(true);
        break;
      case "mentions":
        props.changeRoute("/Mentions", newValue);
        setMentionsBadgeVisibility(true);
        break;
      case "messages":
        props.changeRoute("/Messages", newValue);
        break;
      case "search":
        props.changeRoute("/Search", newValue);
        break;
      case "profile":
        props.changeRoute("/Profile", newValue);
        break;
      default:
    }
  };


  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <BottomNavigation showLabels value={props.route} onChange={handleRoute}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={
          <Badge 
            color="secondary" 
            variant="dot" 
            invisible={homeBadgeVisibility}
          >
            <HomeIcon />
          </Badge>
        }
      />
      <BottomNavigationAction
        label="Mentions"
        value="mentions"
        icon={
          <StyledBadge
            color="secondary"
            badgeContent={4}
            invisible={mentionsBadgeVisibility}
          >
            <MentionsIcon />
          </StyledBadge>
        }
      />
      <BottomNavigationAction
        label="Messages"
        value="messages"
        icon={
          <StyledBadge
            color="secondary"
            badgeContent={4}
            invisible={mentionsBadgeVisibility}
          >
            <MessagesIcon />
          </StyledBadge>
        }
      />
      <BottomNavigationAction
        label="Search"
        value="search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<ProfileIcon />}
      />
      <IconButton
        onClick={handleMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          },
        }}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 150, left: 545 }}
      >
        <MenuItem onClick={closeMenu}>
          <FilterIcon />
        </MenuItem>
      </Menu>

    </BottomNavigation>
  );
};

const mapStateToProps = state => {
  return {
    route: state.route
  };
};

export default connect(
  mapStateToProps,
  { changeRoute }
)(FooterNavigation);
