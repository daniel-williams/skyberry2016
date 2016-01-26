

export function NameValueMap(items, name = 'name', value = 'id') {
  return items.map(item => {
    return {
      name: item[name],
      value: item[value],
    };
  });
}

export function ToKeyMap(items, key = 'id') {
  const result = items.reduce((accum, item) => {
    accum[item.id] = item;
    return accum;
  }, {});
  return result;
}
