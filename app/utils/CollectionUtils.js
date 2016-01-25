

export function NameValueMap(items, name = 'name', value = 'id') {
  return items.map(item => {
    return {
      name: item[name],
      value: item[value],
    };
  });
}

export function ToKeyMap(items, key = 'id') {
  return items.reduce((accum, item) => {
    return accum[item.id] = item;
  }, {});
}
