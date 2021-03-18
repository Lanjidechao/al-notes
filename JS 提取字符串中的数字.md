# JS 提取字符串中的数字

```js
var str = "example12str933"
var res1 = str.replace(/\D/g, '') // 第一种替代所有非数字 \D
var res2 = str.replace(/[^\d]/g, '') // 第二种替代所有非数字 ^\d
var res3 = str.replace(/[^0-9]/g, '') // 第三种替代所有非 0-9 ^0-9
var resArry = str.match(/\d+/)[index] // 数组
// res1 12933
// res2 12933
// res3 12933
// resArry [12, 933]
```

