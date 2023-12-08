
mdbook build
mv book docs
cp CNAME ./docs/

git add .
git commit -m 'deploy'
git push -u -f origin master
