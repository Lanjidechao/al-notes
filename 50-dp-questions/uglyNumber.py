import time


def upmostDivide(a, b):
    while a % b == 0:
        a = a / b
    return a


def isUgly(no):
    no = upmostDivide(no, 2)
    no = upmostDivide(no, 3)
    no = upmostDivide(no, 5)
    return 1 if no == 1 else 0


def getNthUglyNo(n):
    i = 1
    count = 1
    while n > count:
        i += 1
        if isUgly(i):
            count += 1
    return i


# Driver code
time_start = time.time()
no = getNthUglyNo(150)
time_end = time.time()
print('150th ugly no is', no)
print('cost ', (time_end - time_start) * 1000, 'ms')
