Overlapping Subproblems 重叠子问题

Optimal Substructure 最优子结构

unweighted graph 无权图，在图论中出现。

Longest Increasing Subsequence （LIS）最长上升子序列

exponential  指数的 呈指数

Bitmasking 位屏蔽



##### 最长递增子序列问题（LIS） 动态规划 JavaScript

问题很简单，给定一个数组，找出这个数组的最长递增子序列，返回其长度。

分析：

在分析中，你需要对子序列、最长递增子序列、当前最长递增子序列加以区分，以免混淆。
分析中的变量：
- nums - 给定的数组
- n - 给定数组的长度
- lis[i] - nums.slice(0, i)的最长递增子序列长度

事实A：*一个递增子序列长度增加，一定是新元素比当前最长递增子序列中的（最后一个）元素大。有新元素添加到最长递增子序列中后，当前最长递增子序列的长度增加1 。*

根据事实A可得 如果存在一个j， nums[n] > nums[j]，且lis[n] < lis[j] + 1， 则lis[n] = lis[j] + 1
这里会和我们习惯的线性思维有些冲突：我们不是在求解lis[n]吗？ *lis[n] < lis[j] + 1* 这个如何判断呢？这个就是DP中D的作用，问题的解是在动态变化的，lis[n]的值也在不断变化，直到找到正解。

因此，我们需要找到所有 0 < j < n 中，满足上述条件的最优j。由求lis[n]的过程可得，求lis[n-1]也类似，去寻找满足 0 < j < n - 1 的最优j。这种自上而下的动态求解，称为*Memoization* 记忆法。而重复寻找最优的j的过程，则是寻找 *Optimal Substructure* 最优子结构的过程。

代码实现：
```javascript
var lengthOfLIS = function(nums) {

    var max = 0
    var lis = new Array(nums.length)
    
    for(let i = 0; i < nums.length; i++) {
        lis[i] = 1
    }
    
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && lis[j] + 1 > lis[i]) {
                lis[i] = lis[j] + 1
            }
        }
    }

    for (let i = 0; i < nums.length; i++) {
        if (max < lis[i]) {
            max = lis[i]
        }
    }

    return max
};
```
如果你有任何疑问，请留言，我会尽力为你解答。