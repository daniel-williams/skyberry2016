import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {requireAuthentication} from '../containers/AuthenticatedComponent';

// containers
import Root from '../containers/Root';
import Main from '../containers/Main';
import Home from '../containers/Home';
import Blog from '../containers/Blog';
import Portfolio from '../containers/Portfolio';
import Contact from '../containers/Contact';
import SignIn from '../containers/SignIn';
import SignOut from '../containers/SignOut';
import Dashboard from '../containers/Dashboard';
import Project from '../containers/Project';

// pages
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
        <Route path='/contact' component={Contact} />
        <Route path='/dashboard/sign-in' component={SignIn} />
        <Route path='/dashboard/sign-out' component={SignOut} />
        <Route path='/dashboard' component={requireAuthentication(Dashboard)}>
          <Route path='projects' component={Project}>
            <Route path="(:aSlug)/(:pSlug)" component={Project}/>
          </Route>
        </Route>
      </Route>
    </Route>
);

export default routes;
