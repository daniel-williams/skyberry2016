import {Map} from 'immutable';

import account from './account';
import blog from './blog';
import consultation from './consultation';
import contact from './contact';
import identity from './identity';
import featured from './featured';
import portfolio from './portfolio';
import project from './project';
import review from './review';
import settings from './settings';
import spy from './spy';
import subscribe from './subscribe';
import testimonial from './testimonial';
import user from './user';


const initialState = Map({});

export default function(state = initialState, action) {
  return Map({
    account: account(state.get('account'), action),
    blog: blog(state.get('blog'), action),
    consultation: consultation(state.get('consultation'), action),
    contact: contact(state.get('contact'), action),
    featured: featured(state.get('featured'), action),
    identity: identity(state.get('identity'), action),
    portfolio: portfolio(state.get('portfolio'), action),
    project: project(state.get('project'), action),
    review: review(state.get('review'), action),
    settings: settings(state.get('settings'), action),
    spy: spy(state.get('spy'), action),
    subscribe: subscribe(state.get('subscribe'), action),
    testimonial: testimonial(state.get('testimonial'), action),
    user: user(state.get('user'), action),
  });
}
