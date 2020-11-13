/**
 * 使用 setTimeout 实现 setInterval
 */
let timerId = null;

function setIntervalMocker(callback, interval) {
  function fn() {
    callback();
    const prevTimmerId = timerId;
    timerId = setTimeout(fn, interval);
    clearTimeout(prevTimmerId);
  }

  return setTimeout(fn, interval);
}

function clearIntervalMocker(intervalId) {
  clearTimeout(intervalId);
}