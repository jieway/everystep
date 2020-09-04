#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add .
git commit -m "🔥 add Leetcode 1566"

git push -f git@github.com:weijiew/codestep.git master

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:weijiew/codestep.git master:gh-pages

cd -