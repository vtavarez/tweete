import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MuteFiltersIcon from "@material-ui/icons/SpeakerNotesOff";
import LikesIcon from "@material-ui/icons/Favorite";
import ListIcon from "@material-ui/icons/List";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 0,
    color: theme.palette.grey[400],
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.primary.main
    }
  },
  icon: {
    transform: 'translate(5px, 5px)'
  },
  iconBox: {
    position: "relative",
    backgroundColor: "#424242",
    width: 34,
    height: 34,
    borderRadius: "100%"
  }
}));

const VertMenuOption = withStyles(theme => ({
  selected: {
    backgroundColor: "transparent !important",
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
  const yPos = window.innerHeight - 220;
  const xPos = 455;


  useEffect(() => {
    const newRoutesState = { ...routesState };
    newRoutesState[props.selectedRoute] = true;
    setSelectedRoute(newRoutesState);
  }, [props.selectedRoute, routesState]);
  

  const handleMenu = (e, route) => {
    props.selectRoute(e, route);
    setAnchorEl(null);
  };


  return (
    <React.Fragment>
      <IconButton
        aria-label="More"
        aria-controls="vert-menu"
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.currentTarget)}
        className={classes.root}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="vert-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none"
          }
        }}
        anchorReference="anchorPosition"
        anchorPosition={{ top: yPos, left: xPos}}
        marginThreshold={0}
        onBackdropClick={() => setAnchorEl(null)}
      >
        <VertMenuOption
          onClick={e => handleMenu(e, "filters")}
          className={classes.root}
          selected={filters}
          disableGutters
        >
          <Box className={classes.iconBox}>
            <MuteFiltersIcon className={classes.icon} />
          </Box>
        </VertMenuOption>

        <VertMenuOption
          onClick={e => handleMenu(e, "likes")}
          className={classes.root}
          selected={likes}
          disableGutters
        >
          <Box className={classes.iconBox}>
            <LikesIcon className={classes.icon} />
          </Box>
        </VertMenuOption>

        <VertMenuOption
          onClick={e => handleMenu(e, "lists")}
          className={classes.root}
          selected={lists}
          disableGutters
        >
          <Box className={classes.iconBox}>
            <ListIcon className={classes.icon} />
          </Box>
        </VertMenuOption>
      </Menu>
    </React.Fragment>
  );
};

export default FooterNavVertMenu;
