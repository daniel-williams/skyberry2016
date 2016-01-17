import React from 'react';
import {Route, IndexRoute} from 'react-router';

// containers
import Root from '../containers/Root';
import Home from '../containers/Home';
import Blog from '../containers/Blog';
import Portfolio from '../containers/Portfolio';

// pages
import Main from '../pages/Main';
import About from '../pages/About';


const routes = (
    <Route component={Root}>
      <Route component={Main}>
        <Route path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/portfolio' component={Portfolio} />
        <Route path='/blog' component={Blog}>
          <Route path='/blog/:articleSlug' component={Blog} />
        </Route>
        <Route path='/contact' component={About} />
      </Route>
    </Route>
);

export default routes;
