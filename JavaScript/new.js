// 手写模拟实现 new 关键字的调用过程
function newFactory(ctor, ...args) {
    if(typeof ctor !== 'function'){
      throw 'newOperator function the first param must be a function';
    }

    // 1. 生成一个空对象
    let obj = new Object();

    // 2. 绑定原型对象
    obj.__proto__ = Object.create(ctor.prototype);

    // 3. 绑定 this
    let res = ctor.apply(obj, ...args);

    // 4. 确定是否返回对象实例
    let isObject = res instanceof Object;
    return isObject ? res : obj;
};

/**
 * 问题：new Object()创建的对象纯净么？
 * 我们定义一个对象的 __proto__ 属性为空的对象是一个纯净的对象。
 * 
 * Object.create()，该方法创建一个新对象，使用‘现有的对象’来提供新创建的对象的__proto__。
 */