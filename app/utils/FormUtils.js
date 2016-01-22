
export function getFormErrors(prefix, errors) {
  return Object.keys(errors).reduce((accum, item) => {
    if(!item.startsWith(prefix)) {
      return accum;
    } else {
      accum[item.slice(prefix.length)] = errors[item].join(' ');
      return accum;
    }
  }, {});
}
