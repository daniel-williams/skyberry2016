

import {
  ACCOUNTS_SET_SELECTED,
} from './'


export function setSelectedAccount(id) {
  return {
    type: ACCOUNTS_SET_SELECTED,
    payload: {
      selected: id,
    }
  };
}
