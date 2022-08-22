// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

// 字符串反转
let a = 'abc';
const reserveString = (string) => string.split('').reverse().join('');
let b = reserveString(a);

// 扁平化数组
let arr = [1, 2, [3, 4, [5]]];
const flatArrDeep = (arr, d = 1) => {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatArrDeep(val, d - 1) : val),
        []
      )
    : arr;
};

// console.log(flatArrDeep(arr, 1));

// 构造函数继承
function myNew(fn, ...args) {
  const obj = {};
  obj._proto_ = fn.prototype;
  const res = fn.apply(obj, args);
  return typeof res === 'object' ? res : obj;
}

// ES5 继承
function children(name) {
  parent.call(this);
  this.name = name;
}
children.prototype = Object.create(parent.prototype);
children.prototype.constructor = children;

// ES6 继承
class parents {
  constructor(name) {
    this.name = name;
  }
  get() {}
}

class child extends parents {
  constructor(name) {
    // 当方法用 继承实例
    super(name);
  }
  get() {
    // 当对象用 继承父类的方法
    super.get();
  }
}

// ES5 模仿 ES6 Class 等价于 Class 有个 say 方法
function myClass(person) {
  return Object.defineProperty(person.prototype, 'say', {
    value: function say() {},
  });
}
// Object.create 仿写
function Temp() {
  this.constructor = child;
}
function myObjCreate(prototype) {
  let temp = new Temp();
  temp.prototype = prototype;
  return temp;
}

// instance
function myInstance(left, right) {
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

// 深 copy
// 递归或者深度优先

// call appley 手写
// call的话入参改成...args 就行
function myApply(content, args) {
  content = content || window;
  const fn = Symbol();
  content[fn] = this;
  const res = content[fn](...args);
  delete content[fn];
  return res;
}

// 手写 bind
function myBind(content, ...args) {
  const fn = this;
  return function () {
    return fn.apply(content, [...args, ...arguments]);
  };
}

// 函数柯里化
function createCurry(fn) {
  var slice = Array.prototype.slice,
    stored_args = slice.call(arguments, 1);
  return function () {
    let new_args = slice.call(arguments),
      args = stored_args.concat(new_args);
    return fn.apply(null, args);
  };
}

// 1、对象（包括数组，对象，函数等）参与原始运算如算术或逻辑运算时，会无参调用其toString或者valueOf方法得到一个原始值
// 2、bind 返回一个绑定参数的新函数
function add() {
  let total = [...arguments].reduce((a, b) => a + b);
  function sum() {
    total += [...arguments].reduce((a, b) => a + b);
  }
  sum.toString = sum.valueOf = function () {
    return total;
  };
  return sum;
}

function add2(...args) {
  // 将参数绑定到add上
  // 此时f其实还是add函数，但已经固定了一些参数，所以并不是原来的add函数
  // 用bind返回新函数以保证满足**柯里化保留参数**的特性
  var f = add2.bind(null /*this不用绑定*/, ...args);
  // 重新实现这个bound add函数的toString方法
  // f参与运算应该被当成args的和，与f自己再接收的参数无关
  // 考虑到lazy的特性，还是需要时再计算，但又没了缓存，每次用都会重新计算
  // 如果有需要，可以改成有缓存的版本
  f.toString = () => {
    return args.reduce((a, b) => a + b, 0);
  };
  return f;
}
// 考虑到add可能直接被用于运算中，可以加上这句
add.toString = () => 0;
// 测试调用
console.log(add(4)(6)); // 10

function listToTree(list) {
  let info = list.reduce(
    (map, node) => ((map[node.id] = node), (node.children = []), map),
    {}
  );
  return list.filter((node) => {
    info[node.parentId] && info[node.parentId].children.push(node);
    return !node.parentId;
  });
}

// 防抖 随便触发 但是事件触发的 N 秒后才执行 一个是多次点击，只触发一次 用户输入搜索
function debounce(fn, delay = 200) {
  let timer = 0;
  return function () {
    // 如果这个函数已经被触发了
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments); // 透传 this和参数
      timer = 0;
    }, delay);
  };
}

// 节流持续触发 每隔一段时间只执行一次 一个是一个时间段，只触发一次 滚动或者拖拽
// 节流函数
function throttle(fn, delay = 200) {
  let timer = 0;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments); // 透传 this和参数
      timer = 0;
    }, delay);
  };
}
