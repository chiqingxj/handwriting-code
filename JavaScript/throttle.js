/**
 * 实现一个节流函数
 */
 // option: leading：false 表示禁用第一次执行 trailing: false 表示禁用停止触发的回调
function throttle(func, wait, options = {}) {
  var timeout, context, args;
  var previous = 0;

  var throttled = function() {
    var now = new Date().getTime();

    if (!previous && options.leading === false) {
      previous = now;
    }

    var remaining = wait - (now - previous);

    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;

      func.apply(context, args);
      
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
      }, remaining);
    }
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  };

  return throttled;
}