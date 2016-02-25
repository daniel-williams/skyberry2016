import {fromJS} from 'immutable';

const initialState = fromJS({
});

export default function(state = initialState, action) {
  console.log(action);
  switch(action.type) {
    default:
      return state;
  }
}
