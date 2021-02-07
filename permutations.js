/**
 * @param {string} s
 */
var permutations = function(s) {
  const length = s.length
  backtracking(s, 0, length - 1)
}

// 将字符串a的i和j字符调换位置
var swap = function(a, i, j) {
  var charArray = a.split('')
  var tempChar = charArray[i]
  charArray[i] = charArray[j]
  charArray[j] = tempChar
  return charArray.join('')
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