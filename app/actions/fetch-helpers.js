
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



export function createAuthRequestOptions(formData) {
  const payload = {
    username: formData.username,
    password: formData.password,
    grant_type: 'password'
  };
  return {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: toFormData(payload),
  };
}
export function createRefreshRequestOptions(refresh_token) {
  const payload = {
    refresh_token,
    grant_type: 'refresh_token'
  };
  return {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: toFormData(payload),
  };
}
export function getApiRequestOptions(access_token) {
  return {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer  ' + access_token
    },
  };
}
export function postApiRequestOptions(access_token, payload) {
  return {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer  ' + access_token
    },
    body: JSON.stringify(payload),
  };
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
