#### dp基础问题： 寻找2D矩阵中到达某一坐标的可能路径总数



##### 问题描述：

给定一个二维数组，求解从 (0, 0) 开始，访问到 (x, y) 的可能路径数量。在矩阵中，你每次只能往下或者往右移动一个单位。



##### 问题分析：

本题的解题思路和上一篇博文类似。

由于限制条件中的只能往右或者往下移动，易得到达某坐标的最后一步为向下或者向右，这两种步骤都是到达这个坐标的方式。因此，用 *numWays\[i][j]* 来表示到达坐标(i, j)的总路径数的话，可得公式：

```
numWays(i, j) = numWays(i - 1, j) + numWays[i][j - 1]
```

现在继续分解问题，从坐标(0, 0)开始移动，可以注意到有两种特殊的坐标：

1. 横坐标为0的坐标，即最上方(topmost)的坐标
2. 纵坐标为0的坐标，即最左边(leftmost)的坐标

把第一种坐标拿出来分析， 由于限制条件，到达这类坐标的路径数为：

```
numWays(0, j) = 1
```

可知到达这类坐标的路径数是唯一可知的。同理最左的坐标同样是唯一可知的。

而知道矩阵最外两边的路径总数之后，通过层层往里的路径总数求解，可逐个求出所有坐标的路径总数。

因此，需要的所有信息都已经得到，可以开始写解法了。

##### 算法：

```javascript
/**
 * 
 * @param {int} x 
 * @param {int} y 
 */
var twodimensional = function(x, y) {
  // construc numWays dp 2-dimensional-matrix
  var numWays = new Array()
  for (let i = 0; i < y; i++) {
    a[i] = new Array()
    for (let j = 0; j < x; j++) {
      a[i][j] = 0
    }
  }
  numWays[0][0] = 1

  // construct topmost ways
  for (let i = 1; i < x; i++) {
    numWays[0][i] = 1
  }

  // construct leftmost ways
  for (let i = 1; i < y; i++) {
    numWays[i][0] = 1
  }

  // find all ways
  for (let i = 1; i < x; i++) {
    for (let j = 1; j < y; j++ ) {
      numWays[i][j] = numWays[i - 1][j] + numWays[i][j - 1]
    }
  }
  
  return numWays[x - 1][y - 1]
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

