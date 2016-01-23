
export function getFormErrors(errors) {
  console.log('getFormErrors', errors);
  return Object.keys(errors).reduce((accum, item) => {
    accum[item] = errors[item].join(' ');
    return accum;
  }, {});
}

// export function getFormErrors(prefix, errors) {
//   return Object.keys(errors).reduce((accum, item) => {
//     if(!item.startsWith(prefix)) {
//       return accum;
//     } else {
//       accum[item.slice(prefix.length)] = errors[item].join(' ');
//       return accum;
//     }
//   }, {});
// }
