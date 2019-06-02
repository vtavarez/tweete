import React from 'react';

// React Router
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';

// Routes
import Home from './routes/Home';
import Filters from './routes/Filters';
import Likes from './routes/Likes';
import Lists from './routes/Lists';
import Mentions from './routes/Mentions';
import Messages from './routes/Messages';
import Profile from './routes/Profile';
import Search from './routes/Search';

// Navigation
import FooterNavigation from './FooterNavigation';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue
  },
});

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <React.Fragment>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Filters" exact component={Filters} />
              <Route path="/Likes" exact component={Likes} />
              <Route path="/Lists" exact component={Lists} />
              <Route path="/Mentions" exact component={Mentions} />
              <Route path="/Messages" exact component={Messages} />
              <Route path="/Profile" exact component={Profile} />
              <Route path="/Search" exact component={Search} />
            </Switch>
          </React.Fragment>
          <FooterNavigation />
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
