import {Map} from 'immutable';

import blog from './blog';
import contact from './contact';
import identity from './identity';
import featured from './featured';
import portfolio from './portfolio';
import subscribe from './subscribe';
import testimonials from './testimonials';
import user from './user';


const initialState = Map({});

export default function(state = initialState, action) {
  return Map({
    blog: blog(state.get('blog'), action),
    contact: contact(state.get('contact'), action),
    featured: featured(state.get('featured'), action),
    identity: identity(state.get('identity'), action),
    portfolio: portfolio(state.get('portfolio'), action),
    subscribe: subscribe(state.get('subscribe'), action),
    testimonials: testimonials(state.get('testimonials'), action),
    user: user(state.get('user'), action),
  });
}
