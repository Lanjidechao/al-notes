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