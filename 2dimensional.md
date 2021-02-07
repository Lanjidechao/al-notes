#### dp基础问题： 寻找2D矩阵中到达某一点的最小代价路径



##### 问题描述：

给定一个二维数组 *Cost\[i]\[j]* 表示访问坐标为 (i, j) 的代价。求解从 (0, 0) 开始，访问到 (x, y) 的最小代价。在矩阵中，你每次只能往下或者往右移动一个单位。且所有代价都是正整数。



##### 问题分析：

由于限制条件中的只能往右或者往下移动，易得到达某坐标的最小代价公式可写作：

```
MinCost(i, j) = min(MinCost(i - 1, j), MinCost(i, j - 1)) + Cost[i][j]
```

现在继续分解问题，从坐标(0, 0)开始移动，可以注意到有两种特殊的坐标：

1. 横坐标为0的坐标，即最上方(topmost)的坐标
2. 纵坐标为0的坐标，即最左边(leftmost)的坐标

把第一种坐标拿出来分析， 由于限制条件，这类坐标的代价为：

```
MinCost(0, j) = MinCost(0, j - 1) + Cost[0,j]
```

可知到达这类坐标的代价是唯一可知的。同理最左的坐标同样是唯一可知的。

而知道矩阵最外两边的坐标代价之后，通过层层往里的最小代价求解，可逐个求出所有坐标的最小代价。

因此，需要的所有信息都已经得到，可以开始写解法了。

##### 算法：

```javascript
/**
 * 
 * @param {int[][]} Cost 
 * @param {int} x 
 * @param {int} y 
 */
var twodimensional = function(Cost, x, y) {
  // construc MinCost dp 2-dimensional-matrix
  var MinCost = new Array()
  for (let i = 0; i < y; i++) {
    a[i] = new Array()
    for (let j = 0; j < x; j++) {
      a[i][j] = 0
    }
  }
  MinCost[0][0] = Cost[0][0]

  // construct topmost cost
  for (let i = 1; i < x; i++) {
    MinCost[0][i] = MinCost[0][i - 1] + Cost[0][i]
  }

  // construct leftmost cost
  for (let i = 1; i < y; i++) {
    MinCost[i][0] = MinCost[i - 1][0] + Cost[i][0]
  }

  // find all the cost
  for (let i = 1; i < x; i++) {
    for (let j = 1; j < y; j++ ) {
      MinCost[i][j] = Math.min(MinCost[i - 1][j], MinCost[i][j - 1]) + Cost[i][j]
    }
  }
  
  return MinCost[x - 1][y - 1]
}
```

