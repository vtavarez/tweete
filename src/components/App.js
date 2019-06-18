import React from "react";
import "../css/index.css";

// React Router
import { Router, Switch, Route } from "react-router-dom";
import history from "../routerHistory";

// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";
import grey from "@material-ui/core/colors/grey";

// Routes
import Home from "./routes/Home";
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

const theme = createMuiTheme({
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
    text: {
      primary: lightBlue[500],
      secondary: grey[50]
    }
  }
});

const App = () => { 
  return (
    <div className="app--container">
      <CssBaseline />

      <ThemeProvider theme={theme}>
        <Router history={history}>
          <HeaderNavigation />

          <React.Fragment>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Filters" exact component={Filters} />
              <Route path="/Likes" exact component={Likes} />
              <Route path="/Lists" exact component={Lists} />
              <Route path="/Mentions" exact component={Mentions} />
              <Route path="/Messages" exact component={Messages} />
              <Route path="/Profile" exact component={Profile} />
              <Route path="/Search" exact component={Search} />9
            </Switch>
          </React.Fragment>

          <FooterNavigation/>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;