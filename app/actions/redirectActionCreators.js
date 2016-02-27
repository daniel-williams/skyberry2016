import * as actions from './redirectActions';


export function setNext(next) {
  return {
    type: actions.NEXT_SET,
    payload: {
      next
    }
  };
}

export function clearNext(next) {
  return {
    type: actions.NEXT_CLEAR,
  };
}

export default {
  setNext,
  clearNext,
}
