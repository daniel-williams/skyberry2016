import {toSlug} from '../utils/SlugUtils';


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
    accum[item[key]] = item;
    return accum;
  }, {});
  return result;
}

export function AddSlug(target, key = 'name') {
  if(Array.isArray(target)) {
    return target.map(item => {
      if(!!item[key] && typeof item[key] === 'string') {
        item.slug = toSlug(item[key]);
      }
      return item;
    });
  } else if(typeof target === 'object' && !!target[key] && typeof target[key] === 'string') {
    target.slug = toSlug(target[key]);
  }
  return target;
}
