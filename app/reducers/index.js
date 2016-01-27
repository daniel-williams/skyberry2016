import {Map} from 'immutable';

import account from './account';
import blog from './blog';
import contact from './contact';
import identity from './identity';
import featured from './featured';
import portfolio from './portfolio';
import project from './project';
import subscribe from './subscribe';
import testimonial from './testimonial';
import user from './user';


const initialState = Map({});

export default function(state = initialState, action) {
  return Map({
    account: account(state.get('account'), action),
    blog: blog(state.get('blog'), action),
    contact: contact(state.get('contact'), action),
    featured: featured(state.get('featured'), action),
    identity: identity(state.get('identity'), action),
    portfolio: portfolio(state.get('portfolio'), action),
    project: project(state.get('project'), action),
    subscribe: subscribe(state.get('subscribe'), action),
    testimonial: testimonial(state.get('testimonial'), action),
    user: user(state.get('user'), action),
  });
}
