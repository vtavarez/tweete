import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeRoute, fetchTweets } from "../actions";
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
    maxWidth: 500,
    backgroundColor: "#2d2c2f"
  },
  action: {
    cursor: "default"
  }
});

const FooterNavigation = props => {
  const { route, tweets, changeRoute, fetchTweets } = props;
  const { nav, action } = useStyles();
  const [mentionsBadgeInvisible, setMentionsBadgeInvisible] = useState(false);
  const [messagesBadgeInvisible, setMessagesBadgeInvisible] = useState(false);
  const [homeBadgeInvisible, setHomeBadgeInvisible] = useState(true);
  const [stateTweetsLength, setStateTweetsLength] = useState(0);

  const handleRoute = (event, route) => {
    switch (route) {
      case "home":
        changeRoute("/");
        fetchTweets();
        setHomeBadgeInvisible(true);
        break;
      case "mentions":
        changeRoute("/Mentions");
        setMentionsBadgeInvisible(true);
        break;
      case "messages":
        changeRoute("/Messages");
        setMessagesBadgeInvisible(true);
        break;
      case "search":
        changeRoute("/Search");
        break;
      case "profile":
        changeRoute("/Profile");
        break;
      case "likes":
        changeRoute("/Likes");
        break;
      case "filters":
        changeRoute("/Filters");
        break;
      case "lists":
        changeRoute("/Lists");
        break;
      default:
    }
  };

  return (
    <BottomNavigation className={nav} value={route} onChange={handleRoute}>
      <BottomNavigationAction
        className={action}
        label="Home"
        value="home"
        icon={
          <Badge color="secondary" variant="dot" invisible={homeBadgeInvisible}>
            <HomeIcon />
          </Badge>
        }
      />

      <BottomNavigationAction
        className={action}
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
        className={action}
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
        className={action}
        label="Search"
        value="search"
        icon={<SearchIcon />}
      />

      <BottomNavigationAction
        className={action}
        label="Profile"
        value="profile"
        icon={<ProfileIcon />}
      />

      <FooterNavVertMenu
        className={action}
        selectRoute={(e, route) => handleRoute(e, route)}
        selectedRoute={route}
      />
    </BottomNavigation>
  );
};

const mapStateToProps = state => {
  return {
    route: state.route,
    tweets: state.tweets
  };
};

export default connect(
  mapStateToProps,
  { changeRoute, fetchTweets }
)(FooterNavigation);
