
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

export function authRequestOptions(formData) {
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
export function refreshRequestOptions(refresh_token) {
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

function toFormData(obj) {
  var pairs = [];
  for(var p in obj) {
    if(obj.hasOwnProperty(p)) {
      pairs.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return pairs.join('&');
}
