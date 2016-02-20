import * as redirectActions from './redirectActions';


export function setNext(next) {
  return {
    type: redirectActions.NEXT_SET,
    payload: {
      next
    }
  };
}

export function clearNext(next) {
  return {
    type: redirectActions.NEXT_CLEAR,
  };
}

export default {
  setNext,
  clearNext,
}
