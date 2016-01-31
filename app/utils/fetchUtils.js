import {getFormErrors} from './FormUtils';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if(response.status === 401) {
    let err = new Error(response.statusText);
    err.code = response.status;
    return Promise.reject(err);
  } else {
    return response.json()
      .then(json => {
        let err = new Error(response.statusText);
        err.code = response.status;
        err.formErrors = json.errors ? getFormErrors(json.errors) : {};
        return Promise.reject(err);
      });
    // return Promise.resolve()
    //   .then(() => {
    //     return response.json()
    //       .then(json => {
    //         let err = new Error(response.statusText);
    //         err.code = response.status;
    //         err.formErrors = getFormErrors(json.errors || {});
    //         return Promise.reject(err);
    //       });
    //   });
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
export function getApiRequestOptions(token) {
  let options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
  if(!!token) {
    options.headers['Authorization'] = 'Bearer  ' + token;
  }
  return options;
}

export function postApiRequestOptions(payload, token) {
  let options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  if(!!token) {
    options.headers['Authorization'] = 'Bearer  ' + token;
  }
  return options;
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
