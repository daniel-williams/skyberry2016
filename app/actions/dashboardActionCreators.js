import {
  ACCOUNTS_SET_SELECTED,
} from './accountActions';
import {
  PROJECT_SET_SELECTED,
} from './'


export function setSelectedAccount(key) {
  return {
    type: ACCOUNTS_SET_SELECTED,
    payload: {
      key: key,
    }
  };
}

export function setSelectedProject(key) {
  return {
    type: PROJECT_SET_SELECTED,
    payload: {
      key: key,
    }
  };
}
