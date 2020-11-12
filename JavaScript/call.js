/**
 * 模拟实现 call 函数
 * call 函数的功能是：在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
 * 
 * 模拟实现步骤：
 * 1. 将函数设为对象的属性
 * 2. 执行该函数：使用 eval()，eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。
 * 3. 删除该函数
 */
Function.prototype.callMocker = function(context, ...args) {
    var context = context || window;
    context.fn = this;
  
    var result = eval('context.fn(...args)');
  
    delete context.fn
    return result;
}

// 测试
function foo() {
    return this.name;
}

const baz = {
    name: 'xiaoming'
}

const res = foo.callMocker(baz);

console.log('res-->', res);

