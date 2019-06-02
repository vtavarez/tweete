import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import MentionsIcon from '@material-ui/icons/AlternateEmailOutlined';
import MessagesIcon from '@material-ui/icons/MessageOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';


const FooterNavigation = () => {
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <BottomNavigation showLabels value={value} onChange={handleChange}>
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />}/>
      <BottomNavigationAction label="Mentions" value="mentions" icon={<MentionsIcon />} />
      <BottomNavigationAction label="Messages" value="messages" icon={<MessagesIcon />} />
      <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Profile" value="profile" icon={<ProfileIcon />} />
    </BottomNavigation>
  );
}

export default FooterNavigation;