
export function resolveJSON(response) {
  return response.json();
}
export function resolveErrors(json) {
  if(json.code < 200 || json.code >= 300) {
    let error = new Error(json.description);
    error.code = json.code;
    error.errors = json.errors;
    throw error;
  } else {
    return json;
  }
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let json = response.json();
    return json.then(err => {throw err;})
  }
}

export function parseJSON(response) {
  return response.json();
}

export function createFormPost(body, token) {
  return {
    method: 'post',
    headers: getFormHeaders(token),
    body: toFormData(body),
  };
}

export function createJsonPost(body, token) {
  return {
    method: 'post',
    headers: getJsonHeaders(token),
    body: JSON.stringify(body),
  };
}

const formHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
};
const jsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

function getFormHeaders(token) {
  return !token ? Object.assign({}, formHeaders)
                : Object.assign({}, formHeaders, {'Authorization': 'Bearer  ' + token});
}

function getJsonHeaders(token) {
  return !token ? Object.assign({}, jsonHeaders)
                : Object.assign({}, jsonHeaders, {'Authorization': 'Bearer  ' + token});
}

function toFormData(obj) {
  var pairs = [];
  for(var p in obj) {
    if(obj.hasOwnProperty(p)) {
      pairs.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return pairs.join('&');
}
