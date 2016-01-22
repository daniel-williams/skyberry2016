
import {
  SET_NEXT,
  CLEAR_NEXT,
} from '.';


export function setNext(next) {
  return {
    type: SET_NEXT,
    payload: {
      next
    }
  };
}

export function clearNext(next) {
  return {
    type: CLEAR_NEXT,
  };
}
