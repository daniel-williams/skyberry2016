export const NEXT_SET = 'NEXT_SET';
export const NEXT_CLEAR = 'NEXT_CLEAR';


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

export default {
  setNext,
  clearNext,
}
