var editDistance = function(s1, s2) {
  var m = s1.length
  var n = s2.length
  // dp 为原字符串前i个字符和目标字符串前j个字符的编辑距离
  var dp = new Array()
  for (let i = 1; i <= n; i++) {
    dp[i] = new Array()
    for (let j = 1; j <= m; j++) {
      dp[i][j] = 0
    }
  }
  // 原字符串转化成空字符串
  for (let i = 1; i<=n; i++) {
    dp[0][i] = i
  }
  // 目标字符串转化成空字符串
  for (let i = 1; i<=m; i++) {
    dp[i][0] = i
  }
  // 计算dp数组
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] = s2[j - 1]) { // 字符相同
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], // 替换
          Math.min(dp[i][j - 1], // 插入
            dp[i - 1][j])) // 删除
      }
    }
  }
  return dp[n][m]
}