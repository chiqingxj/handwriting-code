/**
 * 模拟实现 apply 函数
 * apply 函数的功能是：在使用一个指定的 this 值和一个参数数组的前提下调用某个函数或方法。
 * 
 * 模拟实现步骤：
 * 1. 将函数设为对象的属性
 * 2. 执行该函数
 * 3. 删除该函数
 */
Function.prototype.applyMocker = function (context, arr) {
    var context = context || window;
    context.fn = this;

    let result = eval('context.fn(...arr)');

    delete context.fn
    return result;
}


// 测试
function foo(age) {
    return `${this.name}${age}`;
}

const baz = {
    name: 'xiaoming'
}

const res = foo.applyMocker(baz, [19]);

console.log('res-->', res);