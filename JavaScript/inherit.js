/**
 * 原型链继承
 */
function Parent() {
    this.name = 'xiaoming';
}

Parent.prototype.getName = function() {
    return this.name;
}

function Child() {}
Child.prototype = new Parent();

const childInstance = new Child();
console.log(childInstance.getName()); // 'xiaoming'


/**
 * 构造函数继承(经典继承)
 */
function Animal(voice) {
    this.name = ['kobe', 'wade'];
    this.voice = voice;
}

function Cat(voice) {
    Animal.call(this, voice);
}

const catInstance1 = new Cat('miao');
const catInstance2 = new Cat();

catInstance1.name.push('james');

console.log(catInstance1.name); // ['kobe', 'wade', 'james']
console.log(catInstance2.name); // ['kobe', 'wade']
console.log(catInstance1.voice); // 'miao'


/**
 * 组合继承：结合上面两种继承方法
 */
function Human(name) {
    this.name = name;
    this.hairColor = ['black', 'gold', 'white'];
}

Human.prototype.getName = function() {
    return this.name;
}

function Man(name, age) {
    Human.call(this, name);
    this.age = age;
}
Man.prototype = new Human();

const manInstance1 = new Man('xiaoming', 23);

console.log(manInstance1.getName(), manInstance1.age, manInstance1.hairColor); // xiaoming 23 [ 'black', 'gold', 'white' ]


/**
 * 原型式继承
 */
function createObject(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
}

const person = {
    name: 'kevin',
    age: 19
}

const instance1 = createObject(person);
console.log(instance1.name, instance1.age); // kevin 19


/**
 * 寄生式继承
 * Object.create() 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
 */
function createObj(obj) {
    let clone = Object.create(obj);
    clone.sayName = function() {
        console.log('hi, ming');
    }
    return clone;
}


/**
 * 寄生组合式继承
 */
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();

var child1 = new Child('kevin', '18');

console.log(child1);

// 可以封装成下面的代码
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);