import React from 'react';
import history from '../history';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import MentionsIcon from '@material-ui/icons/AlternateEmailOutlined';
import MessagesIcon from '@material-ui/icons/MailOutlineOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';


const FooterNavigation = () => {
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    switch(newValue){
      case 'home':
        history.push('/');
      break;
      case 'mentions':
        history.push('/Mentions');
      break;
      case 'messages':
        history.push('/Messages');
      break;
      case 'search':
        history.push('/Search');
      break;
      case 'profile':
        history.push('/Profile');
      break;
      default:
    }

    return setValue(newValue);
  }

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />}/>
      <BottomNavigationAction label="Mentions" value="mentions" icon={<MentionsIcon />} />
      <BottomNavigationAction label="Messages" value="messages" icon={<MessagesIcon />} />
      <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Profile" value="profile" icon={<ProfileIcon />} />
    </BottomNavigation>
  );
}

export default FooterNavigation;