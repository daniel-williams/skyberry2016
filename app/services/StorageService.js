import Cookies from 'cookies-js'

import constants from '../constants';

// TODO djw: get localStorage setup as fallback
const {daysUntilNextPrompt} = constants.subscribe;
const hasCookies = checkCookies();

export function setPromptToSubscribe(status) {
  const expires = status
    ? getNextPromptDate()
    : Infinity;

  if(hasCookies) {
    if(promptToSubscribe()) {
      Cookies.set('promptToSubscribe', 'no', {expires: expires} );
    }
  }
}
export function promptToSubscribe() {
  return hasCookies
    ? !Cookies.get('promptToSubscribe')
    : true;
}

export default {
  setPromptToSubscribe,
  promptToSubscribe,
}


// internal helpers
function checkCookies() {
  return Cookies.enabled;
}

function getNextPromptDate() {
  let nextPromptDate = new Date();
  nextPromptDate.setDate(nextPromptDate.getDate() + daysUntilNextPrompt);
  return nextPromptDate;
}
