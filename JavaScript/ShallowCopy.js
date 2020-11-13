/**
 * 实现一个 浅拷贝
 */
function shallowCopy(target) {
  if(typeof target === 'object' && target !== null) {
    const result = Array.isArray(target) ? [] : {};

    for(const key in target) {
      if(target.hasOwnProperty(key)) {
        result[key] = target[key];
      }
    }

    return result;
  } else {
    return target;
  }
}