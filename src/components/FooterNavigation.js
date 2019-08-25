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
    maxWidth: 500,
    backgroundColor: "#2d2c2f"
  },
  action: {
    cursor: "default"
  }
});

const FooterNavigation = ({ route, timeline, changeRoute }) => {
  const { nav, action } = useStyles();
  const [mentionsBadgeInvisible, setMentionsBadgeInvisible] = useState(false);
  const [messagesBadgeInvisible, setMessagesBadgeInvisible] = useState(false);
  const [homeBadgeInvisible, setHomeBadgeInvisible] = useState(true);
  const [mostCurrentTweetsLength, setTweetsLength] = useState(null);

  const handleRoute = (event, route) => {
    switch (route) {
      case "home":
        changeRoute("/");
        return setHomeBadgeInvisible(true);
      case "mentions":
        changeRoute("/Mentions");
        return setMentionsBadgeInvisible(true);
      case "messages":
        changeRoute("/Messages");
        return setMessagesBadgeInvisible(true);
      case "search":
        return changeRoute("/Search");
      case "profile":
        return changeRoute("/Profile");
      case "likes":
        return changeRoute("/Likes");
      case "filters":
        return changeRoute("/Filters");
      case "lists":
        return changeRoute("/Lists");
      default:
        return;
    }
  };

  useEffect(() => {
    if (route === "home") {
      setTweetsLength(timeline.length);
    } else if (timeline.length > mostCurrentTweetsLength) {
      setHomeBadgeInvisible(false);
    }
  }, [route, timeline, mostCurrentTweetsLength]);

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
    timeline: state.tweets.timeline
  };
};

export default connect(
  mapStateToProps,
  { changeRoute }
)(FooterNavigation);
