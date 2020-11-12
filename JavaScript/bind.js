/**
 * 模拟实现 bind 函数
 * bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一系列参数将会在传递的实参前传入作为它的参数。
 * bind 函数的作用：
 * 1. 对于普通函数，绑定this指向
 * 2. 对于构造函数，要保证原函数的原型对象上的属性不能丢失
 */
Function.prototype.bindMocker = function (context) {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
