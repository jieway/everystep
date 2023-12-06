# everystep

<p align='center'>
<img src='theme/images/background-cover_.png'>
</p>


该项目最初为写名校 lab 过程中留下了的记录，但是因为[学术诚信](http://integrity.mit.edu/)的缘故，公开解决方案甚至代码是不合适的。但是直接删了有点可惜，后来想尝试换一门语言重写 lab/proj/hw 等内容，所以逐渐演化为用其他语言重写，造轮子过程中的笔记。例如从零实现 OS/Compiler/DB/ld 等，此外和课程答案相关的内容确实会逐渐删去。

<details>
    <summary> ⛽ 从零实现 BitCask 存储引擎 </summary>
    
- Part 1. 一条数据的数据编码解码过程
- Part 2. 如何使用存储引擎？
- Part 3 Set、Get 方法实现
- Part 4 删除逻辑和 Compact 

</details>

<details>
    <summary> 🧊 从零实现 LSM-Tree 存储引擎 </summary>

- Part 1. 总览
- Part 2. 查询、写入过程
- Part 3. 实现
- Part 4. 优化

</details>

<details>
    <summary> 🤖 从零实现关系型数据库</summary>

  - Part 1. 总览
  - Part 2. 实现 Tuple
  - Part 3. 实现 Page
  - Part 4. 实现 HeapFile
  - Part 5. 支持 int 和 string 等数据类型。
  - Part 6. 实现 Catalog

</details>

<details>
    <summary> 🦄 6.S081 2020 Operation System </summary>

  - Part 1. Lab util
  - Part 2. Lab syscall
  - Part 3. 实现 Page
  - Part 4. Lab pgtbl
  - Part 5. Lab trap
  - Part 6. Lab cow
  - Part 7. Lab thread
  - Part 8. Lab lock
  - Part 9. Lab fs
  - Part 10. Lab mmap
  - Part 11. Lab net

</details>

<details>
    <summary> 🎡 6.830 2021 实现一个关系型 DB </summary>

  - Part 1. Lab 1: SimpleDB
  - Part 2. Lab 2: SimpleDB Operators
  - Part 3. Lab 3: Query Optimization
  - Part 4. Lab 4: SimpleDB Transactions
  - Part 5. Lab 5: B+ Tree Index
  - Part 6. Lab 6: Rollback and Recovery

</details>


<details>
    <summary> 🎉 6.824 2022 分布式系统 </summary>
</details>

## 思考

写代码时要紧紧抓住 “我当前所面临的问题是什么？”否则很容易浪费时间。其次是要不断的去问为什么，思考背后的原理，动机，搞清楚对哪部分内容认识不到位。总之个人知识库，记录所学，如有错误还请指正。

为降低复杂度，便于理解旨在提供最简单的实现。整个项目以问题为导向，紧紧围绕着当前所面临的问题是什么？如何解决？解决后产生的新问题是什么？记录了实现系统过程中所遇到的问题，以书籍的形式组织起来更合适，故没有将其放到blog中。

## 本地运行

```
git clone https://github.com/weijiew/everystep.git
cd everystep && mdbook serve --open
kill $(lsof -t -i:3000) ;  mdbook serve --open
```

## 贡献

大部分项目已经将问题拆解为努努力就能实现的地步了。但是因为时间不多没有仔细润色，文字一定程度存在割裂感，故欢迎任何意义上能够优化项目的贡献。

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=weijiew/everystep&type=Date)](https://star-history.com/#weijiew/everystep&Date)

## 协议

2019 - 2023 ©weijiew. Released under the CC BY-NC-SA 4.0 International License.
