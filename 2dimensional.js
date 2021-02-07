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