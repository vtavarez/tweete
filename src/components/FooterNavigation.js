import React, { useState } from "react";
import { connect } from "react-redux";
import { changeRoute } from "../actions";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";
import MentionsIcon from "@material-ui/icons/AlternateEmail";
import MessagesIcon from "@material-ui/icons/Mail";
import SearchIcon from "@material-ui/icons/Search";
import ProfileIcon from "@material-ui/icons/AccountCircle";

const MentionsBadge = withStyles(theme => ({
  badge: {
    top: "4px"
  }
}))(Badge);

const FooterNavigation = props => {
  const [homeBadge, setHomeBadge] = useState(false);
  const [mentionsBadge, setMentionsBadge] = useState(false);

  
  const handleChange = (event, newValue) => {
    switch (newValue) {
      case "home":
        props.changeRoute("/", newValue);
        setHomeBadge(true);
        break;
      case "mentions":
        props.changeRoute("/Mentions", newValue);
        setMentionsBadge(true);
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

  return (
    <BottomNavigation showLabels value={props.route} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={
          <Badge color="secondary" variant="dot" invisible={homeBadge}>
            <HomeIcon />
          </Badge>
        }
      />
      <BottomNavigationAction
        label="Mentions"
        value="mentions"
        icon={
          <MentionsBadge
            color="secondary"
            badgeContent={4}
            invisible={mentionsBadge}
          >
            <MentionsIcon />
          </MentionsBadge>
        }
      />
      <BottomNavigationAction
        label="Messages"
        value="messages"
        icon={<MessagesIcon />}
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
