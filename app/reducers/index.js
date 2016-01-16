import {Map, List, fromJS} from 'immutable';

import blog from './blog';
import subscribe from './subscribe';
import featured from './featured';
import testimonials from './testimonials';


const initialState = Map({});

export default function(state = initialState, action) {
  return Map({
    blog: blog(state.get('blog'), action),
    subscribe: subscribe(state.get('subscribe'), action),
    featured: featured(state.get('featured'), action),
    testimonials: testimonials(state.get('testimonials'), action),
  });
}
