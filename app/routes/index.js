import React from 'react';
import {Route, IndexRoute} from 'react-router';

// containers
import Root from '../containers/Root';

// pages
import Home from '../pages/Home';


const routes = (
    <Route path='/' component={Root}>
      <IndexRoute component={Home} />
    </Route>
);

export default routes;
