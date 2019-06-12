import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FilterIcon from "@material-ui/icons/FilterList";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ListIcon from "@material-ui/icons/List";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 0,
    color: theme.palette.grey[400],
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


const FooterNavVertMenu = props => {

  const routesState = { filters: false, likes: false, lists: false };
  const [selectedRoute, setSelectedRoute] = useState(routesState);
  const { filters, likes, lists } = selectedRoute;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {

    const newRoutesState  = { ...routesState };
    newRoutesState[props.selectedRoute] = true;
    setSelectedRoute(newRoutesState);

  },[props.selectedRoute, routesState]);

  
  const handleMenu = (e, route) => {
     props.selectRoute(e, route); 
     setAnchorEl(null);
  };


  return (

    <React.Fragment>

      <IconButton
        onClick={e => setAnchorEl(e.currentTarget)}
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
          }
        }}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 0, left: 465 }}
        onClose={(e,r) => r === "backdropClick" ? setAnchorEl(null) : null}
      >

        <VertMenuOption 
          onClick={e => handleMenu(e, 'filters')}
          className={classes.root}
          selected={filters}
          disableGutters
        >
          <FilterIcon />

        </VertMenuOption>

        <VertMenuOption 
          onClick={e => handleMenu(e, 'likes')}
          className={classes.root} 
          selected={likes}
          disableGutters
        >
          <FavoriteIcon />

        </VertMenuOption>

        <VertMenuOption 
          onClick={e => handleMenu(e, 'lists')}
          className={classes.root} 
          selected={lists}
          disableGutters
        >
          <ListIcon />

        </VertMenuOption>

      </Menu>

    </React.Fragment>

  );
};

export default FooterNavVertMenu;