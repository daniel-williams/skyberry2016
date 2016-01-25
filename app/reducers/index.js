import {Map} from 'immutable';

import accounts from './accounts';
import blog from './blog';
import contact from './contact';
import identity from './identity';
import featured from './featured';
import portfolio from './portfolio';
import projects from './projects';
import subscribe from './subscribe';
import testimonials from './testimonials';
import user from './user';


const initialState = Map({});

export default function(state = initialState, action) {
  return Map({
    accounts: accounts(state.get('accounts'), action),
    blog: blog(state.get('blog'), action),
    contact: contact(state.get('contact'), action),
    featured: featured(state.get('featured'), action),
    identity: identity(state.get('identity'), action),
    portfolio: portfolio(state.get('portfolio'), action),
    projects: projects(state.get('projects'), action),
    subscribe: subscribe(state.get('subscribe'), action),
    testimonials: testimonials(state.get('testimonials'), action),
    user: user(state.get('user'), action),
  });
}
