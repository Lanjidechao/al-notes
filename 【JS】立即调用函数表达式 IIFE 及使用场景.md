# 【JS】立即调用函数表达式 IIFE 及使用场景

## 定义

IIFE（Immediately Invoked Function Expression）是立即调用函数表达式，它会定义一个方法并且立即调用该方法。

> ```js
> (function () {
>     var message = "IIFE";
> })();
> ```

当然，包含参数的方法也是可以的，前面的圆括号中是函数的定义，而后面的圆括号用来传参：

> ```js
> (function(val) {
>     console.log(val)
> })('IIFE');
> ```

## 使用场景

### 防止变量污染

将变量的作用范围控制在本地，而不污染全局上下文。

```js
var loc = 'global'
function logger() {
    console.log(loc) // global
    console.log(window.loc) // global
}

(function() {
    var loc = 'global'
    function logger() {
        console.log(loc) // global
        console.log(window.loc) // undefined
    }
    logger()
}) ()
```

当然，现在许多框架已经帮你做好了这一步，但还是需要了解的。

## 给变量创建私有状态

最通俗的理解，可以看作java中的getter与setter。

```js
let reference = (function() {
    let secret = 'this variable can not be changed by outter assignment'
    return {
        change(val) {
            secret = val
        }
        get secret() {
            return seret
        }
    }
}) ()
console.log(reference.secret) // this variable can not be changed by outter assignment
reference.change('changed')
console.log(reference.secret) // changed
```

## 递归调用匿名函数

匿名函数没有名字，可以通过IIFE来递归调用。

```js
var charsInBody = (function counter(elm) {
    if (elm.nodeType == 3) { // 文本节点
        return elm.nodeValue.length;
    }
    var count = 0;
    for (var i = 0, child; child = elm.childNodes[i]; i++) {
        count += counter(child);
    }
    return count;
})(document.body);
```

