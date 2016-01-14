import {Map, List, fromJS} from 'immutable';

import subscribe from './subscribe';


const initialState = Map({});

export default function(state = initialState, action) {
  return Map({
    subscribe: subscribe(state.get('subscribe'), action),
  });
}
