

export function switchProject(key) {
  return function(dispatch, getState) {
    const hasCollection = getState().getIn(['projects', 'items']).has(key);

    if(!hasCollection) {
      fetchProject(key)(dispatch, getState);
    }
    dispatch(setSelectedProject(key));
  }
}

export function getProject(key) {
  return function(dispatch) {
    dispatch(fetchingProject());

    return FetchService.getProject(key)
      .then(project => {
        dispatch(fetchProjectSuccess(key, project));
        return Promise.resolve(project);
      })
      .catch(error => {
        dispatch(fetchProjectFailed(error));
        return Promise.reject(error);
      });
  }
}
