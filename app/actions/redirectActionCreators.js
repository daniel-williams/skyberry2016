
import {
  NEXT_SET,
  NEXT_CLEAR,
} from '.';


export function setNext(next) {
  return {
    type: NEXT_SET,
    payload: {
      next
    }
  };
}

export function clearNext(next) {
  return {
    type: NEXT_CLEAR,
  };
}
