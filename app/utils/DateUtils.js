

export function formatDate(d) {
  if(typeof d === 'string') {
    try {
      d = new Date(d);
    } catch(e){}
  }
  if(!(d instanceof Date) || isNaN(d.getTime())) { return ''; } // lets not cause a scene

  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

export function formatDateTime(d) {
  if(typeof d === 'string') {
    try {
      d = new Date(d);
    } catch(e){}
  }
  if(!(d instanceof Date) || isNaN(d.getTime())) { return ''; } // lets not cause a scene

  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}



export default {
  formatDate,
  formatDateTime,
};
