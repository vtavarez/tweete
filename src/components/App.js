import React, { useContext } from "react";
import "../css/global.css";
import "typeface-roboto";

// React Router
import { Switch, Route, __RouterContext } from "react-router-dom";

// React Spring
import { useTransition, animated } from "react-spring";

// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";

// Routes
import Timeline from "./routes/Timeline";
import Filters from "./routes/Filters";
import Likes from "./routes/Likes";
import Lists from "./routes/Lists";
import Mentions from "./routes/Mentions";
import Messages from "./routes/Messages";
import Profile from "./routes/Profile";
import Search from "./routes/Search";

// Navigation
import HeaderNavigation from "./HeaderNavigation";
import FooterNavigation from "./FooterNavigation";

// Login With Twitter
import LoginWithTwitter from "./LoginWithTwitter";

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        "&$disabled": {
          color: grey[50]
        }
      },
      disabled: {}
    },
    MuiPopover: {
      paper: {
        backgroundColor: "#2d2c2f"
      }
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  palette: {
    type: "dark",
    primary: {
      main: lightBlue[500]
    },
    secondary: {
      main: red[500]
    },
    text: {
      primary: lightBlue[500],
      secondary: grey[200],
      disabled: grey[200]
    },
    background: {
      default: "#212121"
    }
  }
});

const App = () => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    initial: { transform: "translate3d(0%,0,0)" },
    from: { transform: "translate3d(100%,0,0)" },
    enter: { transform: "translate3d(0%,0,0)" },
    leave: { transform: "translate3d(-100%,0,0)" },
    unique: true
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginWithTwitter />
        <HeaderNavigation />
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route path="/" exact component={Timeline} />
              <Route path="/Filters" exact component={Filters} />
              <Route path="/Likes" exact component={Likes} />
              <Route path="/Lists" exact component={Lists} />
              <Route path="/Mentions" exact component={Mentions} />
              <Route path="/Messages" exact component={Messages} />
              <Route path="/Profile" exact component={Profile} />
              <Route path="/Search" exact component={Search} />
            </Switch>
          </animated.div>
        ))}
        <FooterNavigation />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
