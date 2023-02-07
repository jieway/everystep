#!/bin/bash

echo "please entru commit messages："
read commitMessage

git add .
git commit -m "$commitMessage"
git push -u origin master

echo "git commit success!"