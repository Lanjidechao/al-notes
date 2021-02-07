2D矩阵进阶问题: 求解两人最大总卡路里消耗量

##### 问题:

现存一个2D矩阵 N x M , 给定一个二维数组 calorie\[N][M] 表示访问到坐标 (N, M)消耗的卡路里值。现在有两个人，一个人（男孩）起点为 (1, 1)，另一人（女孩）起点为 (N, 1)，他们分别要到终点1 (N, M) 和终点2 (1, M)。男孩一步只能往右或者往下行进，女孩一步只能往右或者往上行进。且在二者行进路径上，只允许有一个相遇点，且在总卡路里消耗中，这个相遇点的卡路里不被加到男孩或女孩的消耗量中，求解最大卡路里消耗量总数。

##### 问题分析：

乍一看，这个问题比我们之前三个问题复杂多了。但是除开各种条件，本质上还是一个求解消耗最值的问题。接下来我们重点分析文中的关键限制条件：二者行进路径上只允许有一个相遇点。

**假设相遇点为(i, j)**

首先，男孩通过这个相遇点前后的可能路径为：

- (i-1, j)  -->  (i, j)  -->  (i+1, j) 
- (i-1, j)  -->  (i, j)  -->  (i, j+1)
- (i, j-1)  -->  (i, j)  -->  (i, j+1) 
- (i, j-1)  -->  (i, j)  -->  (i+1, j)  

类似的，女孩通过这个相遇点前后的可能路径为：

- (i+1, j)  -->  (i, j)  -->  (i-1, j) 
- (i+1, j)  -->  (i, j)  -->  (i, j+1)
- (i, j-1)  -->  (i, j)  -->  (i-1, j) 
- (i, j-1)  -->  (i, j)  -->  (i, j+1)

由于除了相遇点(i, j)之外不能有其他相同的行进坐标，因此，二者通过相遇点前后的可能路径只可能为：

- 男孩：(i-1, j)  -->  (i, j)  -->  (i+1, j) ，女孩：(i, j-1)  -->  (i, j)  -->  (i, j+1)
- 男孩：(i, j-1)  -->  (i, j)  -->  (i, j+1) ，女孩：(i+1, j)  -->  (i, j)  -->  (i-1, j) 

在[这篇博文](https://blog.csdn.net/qq_35714301/article/details/113611497)中，我们求解出了到达某一坐标的代价最值算法，那我们可不可以完全套用这个算法，查出条件下的最值呢？答案是不可以。因为这个算法得出的最值数组是从起点(0, 0) 到目标坐标(N, M)的代价最值。它并没有限制在路径中必须经过相遇点(i, j)。所以，我们需要把当前问题分隔成更小的问题：

二者的行进路径被分为了四个部分：

- 男孩从起点到达相遇点前
- 男孩离开相遇点，到达终点
- 女孩从起点到达相遇点前
- 女孩离开相遇点，到达终点

我们只需要求出

- 男孩从(1, 1)到 (i-1, j)、(i+1, j)到(N, M)的代价最值与女孩从(N, 1)到 (i, j-1)、(i, j+1)到(1, M)的代价最值之和
- 男孩从(1, 1)到 (i, j-1)、(i, j+1)到(N, M)的代价最值与女孩从(N, 1)到 (i+1, j)、(i-1, j)到(1, M)的代价最值之和

再将二者比较，取最值，即得答案。

还有一些小细节：

- 根据 i-1, i+1, j-1, j+1需落在坐标区间内，可得相遇点(i, j) 2 <= i <= N-1, 2 <= j <= M-1



算法如下：

```javascript
/**
 * 
 * @param {int[N][M]} calorie
 * @param {int} N
 * @param {int} M
 */
var calories = function(calorie, N, M) {
  var totalCalories = 0
  var BoyStartToMeet = construct(N, M)
  var BoyEndToMeet = construct(N,M)
  var GirlStartToMeet = construct(N, M)
  var GirlEndToMeet = construct(N, M)
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      BoyStartToMeet[i][j] = Math.max(BoyStartToMeet[i - 1][j], BoyStartToMeet[i][j - 1]) + calorie[i][j]
    }
  }
  for (let i = N; i >= 1; i--) {
    for (let j = M; j >= 1; j--) {
      BoyEndToMeet[i][j] = Math.max(BoyEndToMeet[i + 1][j], BoyStartToMeet[i][j + 1]) + calorie[i][j]
    }
  }
  for (let i = N; i <= 1; i++) {
    for (let j = 1; j <= M; j++) {
      GirlStartToMeet[i][j] = Math.max(BoyStartToMeet[i + 1][j], BoyStartToMeet[i][j - 1]) + calorie[i][j]
    }
  }
  for (let i = 1; i <= N; i++) {
    for (let j = M; j >= 1; j--) {
      GirlEndToMeet[i][j] = Math.max(BoyEndToMeet[i - 1][j], BoyStartToMeet[i][j + 1]) + calorie[i][j]
    }
  }
  for (let i = 2; i < N; i++) {
    for (let j = 2; j < M; j++) {
      var opt1 = BoyStartToMeet[i][j - 1] + BoyEndToMeet[i][j + 1] + GirlStartToMeet[i + 1][j] + GirlEndToMeet[i - 1][j]
      var opt2 = BoyStartToMeet[i - 1][j] + BoyEndToMeet[i + 1][j] + GirlStartToMeet[i][j - 1] + GirlEndToMeet[i][j + 1]
      totalCalories = Math.max(totalCalories,Math.max(opt1,opt2))
    }
  }

  return totalCalories
}

var construct = function(N, M) {
  var c = new Array()
  for (let i = 0; i < N; i++) {
    c[i] = new Array()
    for (let j = 0; j < M; j++) {
      c[i][j] = 0          
    }
  }
  return c
}
```

如果你对题解中得代码有疑问、不解，欢迎评论，我会尽力为你解答。