import React from 'react';
import { connect } from 'react-redux';
import { changeRoute } from '../actions';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import MentionsIcon from '@material-ui/icons/AlternateEmailOutlined';
import MessagesIcon from '@material-ui/icons/MailOutlineOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';


const FooterNavigation = props => {

  const handleChange = (event, newValue) => {
    switch(newValue){
      case 'home':
        props.changeRoute('/', newValue);
      break;
      case 'mentions':
         props.changeRoute('/Mentions', newValue);
      break;
      case 'messages':
         props.changeRoute('/Messages', newValue);
      break;
      case 'search':
         props.changeRoute('/Search', newValue);
      break;
      case 'profile':
         props.changeRoute('/Profile', newValue);
      break;
      default:
    }
  }

  console.log(props.route);

  return (
    <BottomNavigation value={props.route} onChange={handleChange}>
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon/>} />
      <BottomNavigationAction label="Mentions" value="mentions" icon={<MentionsIcon/>} />
      <BottomNavigationAction label="Messages" value="messages" icon={<MessagesIcon/>} />
      <BottomNavigationAction label="Search" value="search" icon={<SearchIcon/>} />
      <BottomNavigationAction label="Profile" value="profile" icon={<ProfileIcon/>} />
    </BottomNavigation>
  );
}

const mapStateToProps = (state) => {
  return {
    route: state.route
  }
}

export default connect(mapStateToProps, { changeRoute })(FooterNavigation);