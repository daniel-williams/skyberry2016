
export function formatMoney(n) {
  n = typeof n === 'string' ? +n : n;
  if(typeof n !== 'number') { return ''; } // lets not cause a scene
  return '$' + n.toFixed(2);
}


export default {
  formatMoney,
};
