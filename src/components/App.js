import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';
import CssBaseline from '@material-ui/core/CssBaseline';

import FooterNavigation from './FooterNavigation';

import Feed from './routes/Feed';
import Filters from './routes/Filters';
import Likes from './routes/Likes';
import Lists from './routes/Lists';
import Mentions from './routes/Mentions';
import Messages from './routes/Messages';
import Profile from './routes/Profile';
import Search from './routes/Search';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Feed} />
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
  </React.Fragment>
);

export default App;
