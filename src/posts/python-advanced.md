---
title: Python 高级编程技巧
date: 2026-01-21
author: 博主
category: 技术
tags: [Python, 编程, 高级技巧]
excerpt: 探索 Python 的高级特性，包括装饰器、生成器、上下文管理器等核心概念。
---

# Python 高级编程技巧

Python 提供了许多强大的高级特性，让代码更加优雅和高效。

## 装饰器

### 基础装饰器

```python
import time
from functools import wraps

def timer(func):
    """计时装饰器"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f'{func.__name__} 执行时间: {end - start:.4f}秒')
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "完成"

# 使用
slow_function()  # 输出: slow_function 执行时间: 1.0001秒
```

### 带参数的装饰器

```python
def repeat(times):
    """重复执行装饰器"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                result = func(*args, **kwargs)
                results.append(result)
            return results
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    return f"Hello, {name}!"

print(greet("张三"))
# 输出: ['Hello, 张三!', 'Hello, 张三!', 'Hello, 张三!']
```

### 类装饰器

```python
class Cache:
    """缓存装饰器"""
    def __init__(self, func):
        self.func = func
        self.cache = {}

    def __call__(self, *args):
        if args in self.cache:
            print(f"从缓存获取: {args}")
            return self.cache[args]

        result = self.func(*args)
        self.cache[args] = result
        return result

@Cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # 计算
print(fibonacci(10))  # 从缓存获取
```

## 生成器

### 基础生成器

```python
def countdown(n):
    """倒计时生成器"""
    while n > 0:
        yield n
        n -= 1

for i in countdown(5):
    print(i)  # 5, 4, 3, 2, 1

# 生成器表达式
squares = (x**2 for x in range(10))
print(list(squares))  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

### 生成器管道

```python
def read_file(filename):
    """读取文件"""
    with open(filename) as f:
        for line in f:
            yield line

def filter_lines(lines, keyword):
    """过滤包含关键词的行"""
    for line in lines:
        if keyword in line:
            yield line

def process_lines(lines):
    """处理行"""
    for line in lines:
        yield line.strip().upper()

# 使用管道
lines = read_file('data.txt')
filtered = filter_lines(lines, 'error')
processed = process_lines(filtered)

for line in processed:
    print(line)
```

## 上下文管理器

### 使用 contextlib

```python
from contextlib import contextmanager
import sqlite3

@contextmanager
def database_connection(db_name):
    """数据库连接上下文管理器"""
    conn = sqlite3.connect(db_name)
    try:
        yield conn
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

# 使用
with database_connection('test.db') as conn:
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT)')
    cursor.execute('INSERT INTO users VALUES (1, "张三")')
```

### 类实现上下文管理器

```python
class Timer:
    """计时器上下文管理器"""
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end = time.time()
        self.elapsed = self.end - self.start
        print(f'执行时间: {self.elapsed:.4f}秒')
        return False

# 使用
with Timer():
    time.sleep(1)
    print("执行任务...")
```

## 列表推导式和字典推导式

```python
# 列表推导式
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
matrix = [[i*j for j in range(5)] for i in range(5)]

# 字典推导式
word_lengths = {word: len(word) for word in ['apple', 'banana', 'cherry']}
# {'apple': 5, 'banana': 6, 'cherry': 6}

squared_dict = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 集合推导式
unique_lengths = {len(word) for word in ['apple', 'pie', 'banana']}
# {3, 5, 6}
```

## 高阶函数

```python
from functools import reduce
from operator import add, mul

# map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# reduce
sum_all = reduce(add, numbers)
print(sum_all)  # 15

product = reduce(mul, numbers)
print(product)  # 120

# 自定义高阶函数
def apply_operation(func, data):
    """对数据应用操作"""
    return [func(item) for item in data]

result = apply_operation(lambda x: x * 2, [1, 2, 3])
print(result)  # [2, 4, 6]
```

## 数据类

```python
from dataclasses import dataclass, field
from typing import List

@dataclass
class Person:
    """人员数据类"""
    name: str
    age: int
    email: str = ""
    hobbies: List[str] = field(default_factory=list)

    def __post_init__(self):
        if self.age < 0:
            raise ValueError("年龄不能为负数")

    def greet(self):
        return f"你好，我是 {self.name}，今年 {self.age} 岁"

# 使用
person = Person(name="张三", age=25, hobbies=["读书", "编程"])
print(person.greet())
print(person)
```

## 异步编程

```python
import asyncio
import aiohttp

async def fetch_url(session, url):
    """异步获取 URL"""
    async with session.get(url) as response:
        return await response.text()

async def fetch_multiple_urls(urls):
    """并发获取多个 URL"""
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

# 使用
urls = [
    'https://api.github.com',
    'https://api.github.com/users',
    'https://api.github.com/repos'
]

# asyncio.run(fetch_multiple_urls(urls))
```

## 类型提示

```python
from typing import List, Dict, Optional, Union, Callable

def process_data(
    data: List[int],
    multiplier: int = 2,
    filter_func: Optional[Callable[[int], bool]] = None
) -> List[int]:
    """
    处理数据

    Args:
        data: 输入数据列表
        multiplier: 乘数
        filter_func: 可选的过滤函数

    Returns:
        处理后的数据列表
    """
    result = [x * multiplier for x in data]

    if filter_func:
        result = [x for x in result if filter_func(x)]

    return result

# 使用
numbers = [1, 2, 3, 4, 5]
result = process_data(numbers, multiplier=3, filter_func=lambda x: x > 5)
print(result)  # [6, 9, 12, 15]
```

## 实用工具

```python
from collections import Counter, defaultdict, namedtuple
from itertools import chain, combinations, groupby

# Counter - 计数器
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counter = Counter(words)
print(counter.most_common(2))  # [('apple', 3), ('banana', 2)]

# defaultdict - 默认字典
dd = defaultdict(list)
dd['fruits'].append('apple')
dd['fruits'].append('banana')
print(dd)  # defaultdict(<class 'list'>, {'fruits': ['apple', 'banana']})

# namedtuple - 命名元组
Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)  # 10 20

# chain - 链接迭代器
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list(chain(list1, list2))
print(combined)  # [1, 2, 3, 4, 5, 6]

# combinations - 组合
items = ['A', 'B', 'C']
combos = list(combinations(items, 2))
print(combos)  # [('A', 'B'), ('A', 'C'), ('B', 'C')]
```

> **提示**: Python 的高级特性能让代码更简洁优雅，但要注意可读性和性能平衡。
