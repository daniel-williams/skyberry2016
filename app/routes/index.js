import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {requireAuthentication} from '../containers/AuthenticatedComponent';

// containers
import BillingContainer from '../containers/BillingContainer';
import BlogContainer from '../containers/BlogContainer';
import ContactContainer from '../containers/ContactContainer';
import DesignReviewContainer from '../containers/DesignReviewContainer';
import HomeContainer from '../containers/HomeContainer';
import MainContainer from '../containers/MainContainer';
import PortfolioContainer from '../containers/PortfolioContainer';
import ProjectsContainer from '../containers/ProjectsContainer';
import RootContainer from '../containers/RootContainer';
import SettingsContainer from '../containers/SettingsContainer';
import SignInContainer from '../containers/SignInContainer';
import SignOutContainer from '../containers/SignOutContainer';

// pages
import Dashboard from '../pages/dashboard/Dashboard';
import About from '../pages/About';

import store from '../store';
import {reviewResetUi} from '../actions/reviewActionCreators';


const routes = (
    <Route component={RootContainer}>
      <Route component={MainContainer}>
        <Route path='/' component={HomeContainer} />
        <Route path='/about' component={About} />
        <Route path='/portfolio' component={PortfolioContainer} />
        <Route path='/blog' component={BlogContainer}>
          <Route path='/blog/:articleSlug' component={BlogContainer} />
        </Route>
        <Route path='/contact' component={ContactContainer} />
        <Route path='/dashboard/sign-in' component={SignInContainer} />
        <Route path='/dashboard/sign-out' component={SignOutContainer} />
        <Route path='/dashboard' component={requireAuthentication(Dashboard)}>
          <Route path='billing(/:aSlug)' component={BillingContainer} />
          <Route path='projects' component={ProjectsContainer} />
          <Route path='projects/:aSlug/:pSlug' component={ProjectsContainer}>
            <Route path=':rSlug' component={DesignReviewContainer} onEnter={() => store.dispatch(reviewResetUi())} />
          </Route>
          <Route path='Settings' component={SettingsContainer} />
        </Route>
      </Route>
    </Route>
);

export default routes;
