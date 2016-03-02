
export function toNameValueMap(items, name = 'name', value = 'id') {
  return items.map(item => {
    return {
      name: item[name],
      value: item[value],
    };
  });
}

export function toKeyMap(items, key = 'id') {
  const result = items.reduce((accum, item) => {
    accum[item[key]] = item;
    return accum;
  }, {});
  return result;
}

export function clone(original) {
  return JSON.parse(JSON.stringify(original));
}

// export function shuffle(a) {
//   if(!Array.isArray(a)) { return a; }
//
//   let toShuffle = a.slice(0);
//   let r, j = toShuffle.length - 1;
//
//   while(j > 0) {
//     r = Math.round(Math.random * j);
//     if(r !== j) {
//       let temp = toShuffle[j];
//       toShuffle[j] = toShuffle[r];
//       toShuffle[r] = temp;
//     }
//     j--;
//   }
//   return toShuffle;
// }
export function shuffle(a) {
  let r, j = a.length - 1;

  while(j > 0) {
    r = Math.round(Math.random() * j);
    swap(a, r, j);
    j--;
  }
  return a;
}
function swap(items, a, b) {
  let temp = items[a];
  items[a] = items[b];
  items[b] = temp;
}
