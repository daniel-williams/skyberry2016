
import {
  SET_NEXT_URL,
  CLEAR_NEXT_URL,
} from '.';


export function setNextUrl(nextUrl) {
  return {
    type: SET_NEXT_URL,
    payload: {
      nextUrl
    }
  };
}

export function clearNextUrl(nextUrl) {
  return {
    type: CLEAR_NEXT_URL,
  };
}
