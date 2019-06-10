import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  changeRoute
} from "../actions";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ListIcon from "@material-ui/icons/List";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main
    }
  }
}));

const VertMenuOption = withStyles(theme => ({
  selected: {
    backgroundColor: 'transparent !important',
    color: theme.palette.primary.main
  }
}))(MenuItem);


const FooterNavigation = props => {

  const [homeBadgeInvisible, setHomeBadgeInvisible] = useState(false);
  const [mentionsBadgeInvisible, setMentionsBadgeInvisible] = useState(false);
  const [messagesBadgeInvisible, setMessagesBadgeInvisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuState, setMenuState] = useState({ filters: false, likes: false, lists: false });
  const open = Boolean(anchorEl);
  const classes = useStyles();

  useEffect(() => {
    if (props.route === 'home') {
      setHomeBadgeInvisible(true);
    }
  }, [props.route]);

  const handleRoute = (event, route) => {

    if (route !== 'likes' || route !== 'filters' || route !== 'lists') {
      setMenuState({ filters: false, likes: false, lists: false });
    }

    switch (route) {
      case "home":
        props.changeRoute("/", route);
        setHomeBadgeInvisible(true);
        break;
      case "mentions":
        props.changeRoute("/Mentions", route);
        setMentionsBadgeInvisible(true);
        break;
      case "messages":
        props.changeRoute("/Messages", route);
        setMessagesBadgeInvisible(true);
        break;
      case "search":
        props.changeRoute("/Search", route);
        break;
      case "profile":
        props.changeRoute("/Profile", route);
        break;
      case "likes":
        props.changeRoute("/Likes", route);
        setMenuState({ filters: false, likes: true, lists: false });
        break;
      case "filters":
        props.changeRoute("/Filters", route);
        setMenuState({ filters: true, likes: false, lists: false });
        break;
      case "lists":
        props.changeRoute("/Lists", route);
        setMenuState({ filters: false, likes: false, lists: true });
        break;
      default:
    }
  };

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuOptions = (e, route) => {
    handleRoute(e, route);
    setAnchorEl(null);
  };

  return (

    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>

      <BottomNavigation value={props.route} onChange={handleRoute}>

        <BottomNavigationAction
          label="Home"
          value="home"
          icon={
            <Badge 
              color="secondary" 
              variant="dot" 
              invisible={homeBadgeInvisible}
            >
              <HomeIcon />

            </Badge>
          }
        />

        <BottomNavigationAction
          label="Mentions"
          value="mentions"
          icon={
            <Badge
              color="secondary"
              badgeContent={4}
              invisible={mentionsBadgeInvisible}
            >
              <MentionsIcon />

            </Badge>
          }
        />

        <BottomNavigationAction
          label="Messages"
          value="messages"
          icon={
            <Badge
              color="secondary"
              badgeContent={4}
              invisible={messagesBadgeInvisible}
            >
              <MessagesIcon />

            </Badge>
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
          className={classes.root}
        >
          <MoreVertIcon/>

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
          anchorPosition={{ top: 60, left: 545 }}
        >

          <VertMenuOption 
            onClick={e => handleMenuOptions(e, 'filters')} 
            className={classes.root}
            selected={menuState.filters}
          >
            <FilterIcon />

          </VertMenuOption>

          <VertMenuOption
            onClick={e => handleMenuOptions(e, 'likes')} 
            className={classes.root}
            selected={menuState.likes}
          >
            <FavoriteIcon />

          </VertMenuOption>

          <VertMenuOption
            onClick={e => handleMenuOptions(e, 'lists')} 
            className={classes.root}
            selected={menuState.lists}
          >
            <ListIcon />

          </VertMenuOption>

        </Menu>

      </BottomNavigation>

    </ClickAwayListener>
  );
};

const mapStateToProps = state => {
  return {
    route: state.route
  };
};

export default connect(
  mapStateToProps, {
    changeRoute
  }
)(FooterNavigation);