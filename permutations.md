#### 字符串的所有排序

列出给定字符串的所有排序, 这个问题通常英文中被称作permutations(排列,排序)
而使用的方法为回溯法.(backtracking)
具体的操作为, 将字符串的每一位都与字符串中包括自己的每一位进行交换(swap), 直到没有可与之交换的字符的时候, 输出当前的字符串, 并且返回到上一个节点,尝试交换下一个可能的字符. 直到所有的叶节点都被输出, 即得到所有可能的排序.
用可视化来看回溯的解决步骤:

整个查找最终output的过程可以看作是一棵树往下延伸的过程,这棵树最终的所有叶子节点才是我们关心的输出. 在理解完回溯的过程之后, 代码就呼之欲出了. 这里提供js版本的找出所有排序的算法:

```javascript
/**
 * @param {string} s
 */
var permutations = function(s) {
  const length = s.length
  backtracking(s, 0, length - 1)
}

var backtracking = function(s, l, r) {
  // 当i和j相同，说明除了自身以外已没有可调换数字，直接输出当前字符串
  if (i === j) {
    console.log(s)
  } else { // 否则，继续构造回溯树
    for (let i = l; i <= r; i++) {
      s = swap(s, l, i)
      backtracking(s, l + 1, r)
      // 把s还原成swap之前的字符串，准备交换下一个字符
      s = swap(s, l, i)
    }
  }
}

// 将字符串a的i和j字符调换位置
var swap = function(a, i, j) {
  var charArray = a.split('')
  var tempChar = charArray[i]
  charArray[i] = charArray[j]
  charArray[j] = tempChar
  return charArray.join('')
}
```