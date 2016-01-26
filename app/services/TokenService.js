import Cookies from 'cookies-js'

const accessKey = 'access_token';
const refreshKey = 'refresh_token';
const hasStorage = checkStorage();
const hasCookies = checkCookies();

function checkStorage() {
  return window && typeof(window.localStorage) !== 'undefined';
}
function checkCookies() {
  return Cookies.enabled;
}

export function setTokens(accessToken, refreshToken) {
  if(hasCookies) {
    // session cookie
    Cookies.set(accessKey, accessToken);
  }
  if(hasStorage) {
    // persist refresh token
    window.localStorage.setItem(refreshKey, refreshToken);
  } else if(hasCookies) {
    // persist refresh token, server will expire it
    Cookies.set(refreshKey, refreshToken, {expires:Infinity});
  }
}
export function clearTokens() {
  if(hasCookies) {
    Cookies.set(accessKey, undefined);
    Cookies.set(refreshKey, undefined);
  }
  if(hasStorage) {
    window.localStorage.removeItem(refreshKey);
  }
}
export function getAccessToken() {
  return hasCookies ? Cookies.get(accessKey) : null;
}
export function getRefreshToken() {
  var token = null;
  if(hasStorage) {
    token = window.localStorage.getItem(refreshKey);
  } else if(hasCookies) {
    token = Cookies.get(refreshKey);
  }
  return token;
}
export function getTokens() {
  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
  };
}

export default {
  setTokens,
  getTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
}
