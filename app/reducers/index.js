import {Map, List, fromJS} from 'immutable';

import blog from './blog';
import contact from './contact';
import subscribe from './subscribe';
import featured from './featured';
import portfolio from './portfolio';
import testimonials from './testimonials';
import user from './user';


const initialState = Map({});

export default function(state = initialState, action) {
  return Map({
    blog: blog(state.get('blog'), action),
    contact: contact(state.get('contact'), action),
    subscribe: subscribe(state.get('subscribe'), action),
    featured: featured(state.get('featured'), action),
    portfolio: portfolio(state.get('portfolio'), action),
    testimonials: testimonials(state.get('testimonials'), action),
    user: user(state.get('user'), action),
  });
}
