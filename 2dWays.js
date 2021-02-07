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