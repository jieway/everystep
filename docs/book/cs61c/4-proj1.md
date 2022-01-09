# Project 1: Philphix

> 半个小时看文档，

git clone https://github.com/61c-teach/su21-proj1-starter proj1-philphix
git remote add starter https://github.com/61c-teach/su21-proj1-starter.git
git pull starter main

一个单词替换工具，单词替换存在三种级别，优先级依次降低。

1. 完全相同。
2. 除第一个字符外剩余字母转为小写下完全相同。
3. 完全转为小写后相同。

测试 `./philphix tests/sanity/sanity.dict`

输入集的格式是规范的，两个单词分别是待替换的，和打算替换的内容，中间以数个空格符或制表符隔开。

