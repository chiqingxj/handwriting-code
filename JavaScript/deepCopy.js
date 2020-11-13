/**
 * 实现一个深拷贝
 */
// 判断变量是否为 Object 类型
const isObject = (val) => (typeof val === 'object' || typeof val === 'function') && val !== null;

// 获取 object 的具体类型
const getType = (obj) => Object.prototype.toString.call(obj);

// 可遍历的对象
const traversable = {
  '[Object Map]': true,
  '[Object Set]': true,
  '[Object Array]': true,
  '[Object Object]': true,
  '[Object Arguments]': true
}

// 
const mapTag = '[object Map]';
const setTag = '[object Set]';
const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

// 
const handleRegExp = (target) => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
}

//
const handleFunc = (func) => {
  // 箭头函数直接返回自身
  if(!func.prototype) return func;
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);

  if(!body) return null;

  if (param) {
    const paramArr = param[0].split(',');
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
}

//
const handleNotTraversable = (target, tag) => {
  const Ctor = target.constructor;
  switch(tag) {
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target));
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target));
    case stringTag:
      return new Object(String.prototype.valueOf.call(target));
    case symbolTag:
      return new Object(Symbol.prototype.valueOf.call(target));
    case errorTag: 
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return handleRegExp(target);
    case funcTag:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
}

// 解决循环引用问题：创建一个 Map,记录下已经拷贝过的对象，如果说已经拷贝过，那直接返回它行了
function deepCopy(target, map = new WeakMap()) {
  if(!isObject(target)) return;

  let type = getType(target);

  let result;

  if(!traversable[type]) {
    // 处理不能遍历的对象
    return handleNotTraversable(target);
  } else {
    // 这波操作相当关键，可以保证对象的原型不丢失！
    let ctor = target.constructor;
    result = new ctor();
  }

  if(map.get(target)) {
    return target;
  }

  map.set(target, true);

  // 处理 Map
  if(type === mapTag) {
    target.forEach((item, key) => {
      result.set(deepCopy(key, map), deepCopy(item, map));
    });

    return result;
  }

  // 处理 Set
  if(type === setTag) {
    target.forEach(item => {
      result.add(deepCopy(item, map));
    })

    return result;
  }

  // 处理对象和数组
  for(let key in target) {
    if(target.hasOwnProperty(key)) {
      result[key] = deepCopy(target[key], map);
    }
  }

  return result;
}