def getNthFiboNo(n):
    Fibo = [0] * (n + 1)
    Fibo[0] = 0
    Fibo[1] = 1
    if n <= 1:
        return Fibo[n]
    for i in range(2, n + 1):
        Fibo[i] = Fibo[i - 2] + Fibo[i - 1]
    return Fibo[-1]


no = getNthFiboNo(9)
print('9th fibonacci no is', no)
