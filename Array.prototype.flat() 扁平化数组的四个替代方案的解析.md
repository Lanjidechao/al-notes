# MDN Web文档 Array.prototype.flat() 扁平化数组的四个替代方案代码解析

注：本文为MDN标准Web文档中例子的解释，代码来自MDN[Array.prototype.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_concat_isarray_recursivity)。

## 什么是扁平化

将某一个数组的所有元素及子数组中的元素合并为一个新数组并返回。

> ```js
> const arr1 = [0, 1, 2, [3, 4]];
> 
> console.log(arr1.flat());
> // expected output: [0, 1, 2, 3, 4]
> 
> const arr2 = [0, 1, 2, [[[3, 4]]]];
> 
> console.log(arr2.flat(2));
> // expected output: [0, 1, 2, [3, 4]]
> 
> ```

## 标准方法

Array的原型中已经提供了标准方法，及标题中的`Array.prototype.flat()` 

> ```js
> var newArray = arr.flat([depth])
> ```

中间的depth为可选的结构深度参数，使用 *Infinity* 展开任意深度的嵌套数组

> ```js
> //使用 Infinity，可展开任意深度的嵌套数组
> var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
> arr4.flat(Infinity);
> // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
> ```

并且，`flat()` 方法会移除数组中的空项：

> ```js
> var arr4 = [1, 2, , 4, 5];
> arr4.flat();
> // [1, 2, 4, 5]
> ```

## 替代方案

flat方法有四种替代方案，通过解析它们，我们可以对`js`中的各种原型方法有更深刻的认识。下面一起来一个一个剖析吧。

1. `reduce + concat + isArray + recursivity` reduce递归

   > ```javascript
   > // 使用 reduce、concat 和递归展开无限多层嵌套的数组
   > var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
   > 
   > function flatDeep(arr, d = 1) {
   >    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
   >                 : arr.slice();
   > };
   > 
   > flatDeep(arr1, Infinity);
   > // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
   > ```

   首先看定义的`flatDeep`方法，这里我们需要知道的是默认参数的函数定义方法：
   
   ```js
   function flatDeep(arr, d = 1) // 参数d的默认值为1，若传入其他参数如2，则用其他参数
   ```
   
   接着直接返回一串嵌套的三元运算，首先看最外层，如果 `d < 0` 说明我们当前已经达到需要展开的数组嵌套层数，返回当前状态下的`arr.slice()`及提取当前`arr`的所有元素并返回新数组。`slice`并不会修改原数组，只会返回一个浅复制了原数组中元素的新数组。
   
   再看没有到达嵌套层数的内部`arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])`
   
   首先`reduce`方法接受一个可选参数作为初始值，这里 `[]` 为初始参数，即我们在扁平化过程中所有新的元素都会添加到这个初始值新数组中。
   
   `reduce((acc, val) => {acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val)})`部分，首先判断`val`是不是一个数组（`Array.isArray(val)`）, 如果不是数组而是单纯元素，则直接拼接到当前数组末尾（`acc.concat(val)`），接着判断下一个元素(`val`)。如果当前`val`是一个数组，则将当前元素应用于自身递归（`flatDeep(val, d - 1)`）并且减去一层展开层数。
   
2. `forEach+isArray+push+recursivity` `forEach` 递归

   > ```js
   > // forEach 遍历数组会自动跳过空元素
   > const eachFlat = (arr = [], depth = 1) => {
   >   const result = []; // 缓存递归结果
   >   // 开始递归
   >   (function flat(arr, depth) {
   >     // forEach 会自动去除数组空位
   >     arr.forEach((item) => {
   >       // 控制递归深度
   >       if (Array.isArray(item) && depth > 0) {
   >         // 递归数组
   >         flat(item, depth - 1)
   >       } else {
   >         // 缓存元素
   >         result.push(item)
   >       }
   >     })
   >   })(arr, depth)
   >   // 返回递归结果
   >   return result;
   > }
   > 
   > // for of 循环不能去除数组空位，需要手动去除
   > const forFlat = (arr = [], depth = 1) => {
   >   const result = [];
   >   (function flat(arr, depth) {
   >     for (let item of arr) {
   >       if (Array.isArray(item) && depth > 0) {
   >         flat(item, depth - 1)
   >       } else {
   >         // 去除空元素，添加非undefined元素
   >         item !== void 0 && result.push(item);
   >       }
   >     }
   >   })(arr, depth)
   >   return result;
   > }
   > ```
   
   这里的关键是对匿名函数的递归，用到了IIFE（立即调用函数表达式，具体可以看我[上一篇post](https://blog.csdn.net/qq_35714301/article/details/115459936)），具体思路和上面这个方法类似，只不过用`forEach`或者`for of`的方法进行遍历。结果储存在开头定义的新数组中。
   
   需要知道的是`forEach`方法会自动跳过空元素，而`for of`则需要额外判断。
   
   判断空元素这里用到了一个比较有技巧的方法，叫“短路法”
   
   ```js
   item !== void 0 && result.push(item);
   ```
   
   短路法利用`js`运算符`&&`的逻辑，当左侧的等式不成立时，右侧不会继续判断（即执行）。只有在元素不是空的时候才会将元素添加到数组中。
   
3. 堆栈

   > ```js
   > // 无递归数组扁平化，使用堆栈
   > // 注意：深度的控制比较低效，因为需要检查每一个值的深度
   > // 也可能在 shift / unshift 上进行 w/o 反转，但是末端的数组 OPs 更快
   > var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
   > function flatten(input) {
   >   const stack = [...input];
   >   const res = [];
   >   while (stack.length) {
   >     // 使用 pop 从 stack 中取出并移除值
   >     const next = stack.pop();
   >     if (Array.isArray(next)) {
   >       // 使用 push 送回内层数组中的元素，不会改动原始输入
   >       stack.push(...next);
   >     } else {
   >       res.push(next);
   >     }
   >   }
   >   // 反转恢复原数组的顺序
   >   return res.reverse();
   > }
   > flatten(arr1);// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
   > ```
   
   此方法利用堆栈来展开嵌套数组，首先将原数组堆入一个栈`const stack = [...input]` 这里需要知道剩余参数的概念：
   > **剩余参数**语法允许我们将一个不定数量的参数表示为一个数组。
   
   实际上stack和原数组一致。
   
   从栈的最上面（数组的最尾端）一个一个弹出元素，判断其是否为数组，若为数组则将该数组的所有元素push到栈的最上面。这里用逐步例子来看最方便：
   
   ```js
   // input: [1,2,3,[1,2,3,4, [2,3,4]]]
   const stack = [...input]; // stack: [1,2,3,[1,2,3,4, [2,3,4]]]
   next = stack.pop(); // next: [1,2,3,4, [2,3,4]]
   // 很显然next为数组
   stack.push(...next); // stack: [1,2,3,1,2,3,4, [2,3,4]]
   // 继续弹出最上层
   next = stack.pop(); // next: [2,3,4]
   stack.push(...next); // stack: [1,2,3,1,2,3,4,2,3,4]
   next = stack.pop(); // next: 4
   res.push(next); // res: [4]
   // ...
   // 最后reverse得到目标数组
   // res: [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
   
   ```
   
   `Array.pop()` 弹出最后一个元素并返回其值
   
   `Array.push()` 将元素添加到数组的最后
   
4. 迭代器

   我写了这么久JS还没有使用过迭代器，不过这个方法也挺有趣的，可以看着玩玩。

   > ```js
   > function* flatten(array) {
   >     for (const item of array) {
   >         if (Array.isArray(item)) {
   >             yield* flatten(item);
   >         } else {
   >             yield item;
   >         }
   >     }
   > }
   > 
   > var arr = [1, 2, [3, 4, [5, 6]]];
   > const flattened = [...flatten(arr)];
   > // [1, 2, 3, 4, 5, 6]
   > ```

   `function*`定义一个生成器函数，返回一个生成器对象。你可以理解为Java中的Iterator。

   在生成器函数中的逻辑和前面的大同小异，首先，判断当前的元素是不是数组，如果是数组的话执行`yield* flatten(item)`，这里可以看作自身生成器的迭代调用。如果用语法来解释的话，`yield*` 用来委托给另一个可迭代对象，产生委托的迭代器（flatten）返回的每个值。实际上就是跳出当前的迭代器，把当前元素（数组）交给一个新的迭代器（flatten）迭代。

   如果当前元素是单纯的值的话，产生当前值（`yield item`）

   迭代器定义完成之后，我们想要得到目标数组，直接定义一个数组，并且用剩余参数的方法将迭代器产生的每一个元素全部作为不定参数数组添加到目标数组中。

   类似于迭代器将不断迭代，找到下一个正确的元素，剩余参数捕捉到正确的元素后添加到目标数组中。这样看，还是挺有趣的。

## 后言

通过解析Web文档的四种替代方案，我们还是会遇到一些我们不知道的原型方法和对象的，在阅读的过程中学习，温故而知新。如果你想到了其他有趣的扁平化数组的方法，也可以评论让大家看看~