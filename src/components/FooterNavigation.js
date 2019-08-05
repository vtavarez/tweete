import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeRoute } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";
import MentionsIcon from "@material-ui/icons/AlternateEmail";
import MessagesIcon from "@material-ui/icons/Mail";
import SearchIcon from "@material-ui/icons/Search";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import FooterNavVertMenu from "./FooterNavVertMenu";

const useStyles = makeStyles({
  nav: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    maxWidth: 500
  }
});

const FooterNavigation = props => {
  const classes = useStyles();
  const [homeBadgeInvisible, setHomeBadgeInvisible] = useState(false);
  const [mentionsBadgeInvisible, setMentionsBadgeInvisible] = useState(false);
  const [messagesBadgeInvisible, setMessagesBadgeInvisible] = useState(false);

  useEffect(() => {
    if (props.route === "home") setHomeBadgeInvisible(true);
  }, [props.route]);

  const handleRoute = (event, route) => {
    switch (route) {
      case "home":
        props.changeRoute("/");
        setHomeBadgeInvisible(true);
        break;
      case "mentions":
        props.changeRoute("/Mentions");
        setMentionsBadgeInvisible(true);
        break;
      case "messages":
        props.changeRoute("/Messages");
        setMessagesBadgeInvisible(true);
        break;
      case "search":
        props.changeRoute("/Search");
        break;
      case "profile":
        props.changeRoute("/Profile");
        break;
      case "likes":
        props.changeRoute("/Likes");
        break;
      case "filters":
        props.changeRoute("/Filters");
        break;
      case "lists":
        props.changeRoute("/Lists");
        break;
      default:
    }
  };

  return (
    <BottomNavigation
      className={classes.nav}
      value={props.route}
      onChange={handleRoute}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={
          <Badge color="secondary" variant="dot" invisible={homeBadgeInvisible}>
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

      <FooterNavVertMenu
        selectRoute={(e, route) => handleRoute(e, route)}
        selectedRoute={props.route}
      />
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
  {
    changeRoute
  }
)(FooterNavigation);
