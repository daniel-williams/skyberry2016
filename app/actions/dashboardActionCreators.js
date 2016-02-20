import history from '../routes/history';


export function changeAccount(accountSlug) {
  return function(dispatch, getState) {
    let compositeSlug = null;
    try {
      compositeSlug = getState().getIn(['project', 'projectDirectory', accountSlug]).toJS()[0].value;
    } catch(e) {}

    if(compositeSlug !== null) {
      changeProject(compositeSlug)(dispatch, getState);
    }
  }
}

export function changeProject(compositeSlug) {
  return function(dispatch, getState) {
    history.pushState(null, '/dashboard/projects/' + compositeSlug);
  };
}
