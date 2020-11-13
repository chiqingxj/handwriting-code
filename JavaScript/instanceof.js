/**
 * 模拟实现 instanceof 关键字
 * instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。
 */
function intanceofMocker(instance, target) {
    while(true) {
        if(instance === null) {
            return false;
        }

        if(instance.__proto__ === target.prototype) {
            return true;
        }

        instance = instance.__proto__;
    }
}