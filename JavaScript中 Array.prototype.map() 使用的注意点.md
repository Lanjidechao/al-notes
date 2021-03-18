# JavaScript中 Array.prototype.map() 使用的注意点

[toc]

如果读者对```map()```函数的定义很熟悉的话，直接跳到特点部分。

## 定义

```map()``` 方法创建一个新数组，并且这个数组中的每个元素是调用一次提供的函数后的返回值

### 解读

注意，在```map()``` 方法中，我们需要一个函数作为参数，并且，需要一个 **返回值** 作为新数组中的元素。

### 语法

```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```

#### 参数

```callback```

生成新数组元素的函数，使用三个参数：

- `currentValue`

  `callback` 数组中正在处理的当前元素。

- `index`可选

  `callback` 数组中正在处理的当前元素的索引。

- `array`可选

  `map` 方法调用的数组。

`thisArg`可选

执行 `callback` 函数时值被用作`this`。

#### 返回值

一个由原数组每个元素执行回调函数的结果组成的新数组

## 特点

### 与```foreach()```的区别

- ```foreach()``` 函数对原数组进行直接操作，并且返回 ```undefined```
- ```map()``` 函数的回调函数必须有返回值，作为新数组的元素
- `map()` 函数对原数组不会造成影响

### 容易犯的错误

1. 回调函数中没有返回值

   比如我们需要对某个数组进行操作的时候，用到了下述函数，最终会得到一个元素都是undefined的新数组:

   ```js
   const original = [{id:0, value:0}, {id:1, value:1}, {id:2, value:2}]
   const new = original.map(e => {e.value *= 2})
   console.log(new)
   // output: [undefined, undefined, undefined, undefined,]
   ```

   我们需要在回调函数中添加上 `return e` 才能得到需要的新数组

2. `map()` 函数传递三个参数

   如果我们没有注意到 `map()` 函数会传递三个参数的话，在使用可变参数回调函数的时候可能会得到一个错误的结果。比如`parseInt()` 的参数可为1 / 2个，在使用该回调函数的时候：

   ```js
   ["1", "2", "3"].map(parseInt); // [1, NaN, NaN].
   ```

   原因是在迭代的时候，`parseInt` 接收了 `currentValue` 和 `index` 两个参数，返回值将会错乱：

   ```js
   // parseInt(string, radix) -> map(parseInt(value, index))
   /*  first iteration (index is 0): */ parseInt("1", 0); // 1
   /* second iteration (index is 1): */ parseInt("2", 1); // NaN
   /*  third iteration (index is 2): */ parseInt("3", 2); // NaN
   ```

   所以我们在使用不定参数回调函数时要注意map传递的三个参数：`currentValue` `index` `array`

### 使用技巧

#### 一般方法

```js
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});

// doubles数组的值为： [2, 8, 18]
// numbers数组未被修改： [1, 4, 9]
```

#### 在字符串上应用

我们直接调用Array原型中的map方法：

```js
// 输出每个字符的ASCII码
var map = Array.prototype.map
var a = map.call("Hello World", function(x) {
  return x.charCodeAt(0);
})
// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```

#### 配合`querySelectorAll()` 应用

对当前页面上的动态对象集合进行操作，例如获得所有勾选的checkbox的值：

```js
var elems = document.querySelectorAll('select option:checked');
var values = Array.prototype.map.call(elems, function(obj) {
  return obj.value;
});
```

## 参考链接

- [MDN Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)