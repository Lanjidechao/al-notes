def getNthCatalanNo(n):
    if(n == 0 or n == 1):
        return 1
    catalan = [0] * n
    catalan[0] = 1
    catalan[1] = 1
    for i in range(2, n):
        for j in range(i):
            catalan[i] += catalan[j] * catalan[i - j - 1]
    return catalan[-1]


no = getNthCatalanNo(10)
print('10th catlan no is', no)
