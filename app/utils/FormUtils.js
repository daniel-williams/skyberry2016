
export function getFormErrors(prefix, response) {
  return {
    code: response.code || '500',
    description: response.description || 'Oops, something went wrong.',
    errors: {} && response.errors && getErrors(prefix, response.errors),
  };
}

function getErrors(prefix, errors) {
  return Object.keys(errors).reduce((accum, item) => {
    if(!item.startsWith(prefix)) {
      return accum;
    } else {
      accum[item.slice(prefix.length)] = errors[item].join(' ');
      return accum;
    }
  }, {});
}
