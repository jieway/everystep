## 模板代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>kkk</title>
    <style>
    </style>
</head>
<body>
    <table border="1">
        <tr>
            <td id = "p1">1</td>
            <td id = "p2">2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>4</td>
            <td>5</td>
            <td>6</td>
        </tr>
    </table>
</body>
</html>
```

## 选择器
选择器分为三种：

* 元素选择器：选中元素即可，也就是标签。
* id 选择器：通过 # 来选中id，设置属性。
* class 选择器： 通过 . 选中类名，设置属性。
```html
    <style>
        td {
            background-color: red;
        }
    </style>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>kkk</title>
    <style>
    </style>
</head>
<body>
    <table border="1">
        <tr>
            <td id = "p1">1</td>
            <td id = "p2">2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>4</td>
            <td>5</td>
            <td>6</td>
        </tr>
    </table>
</body>
</html>
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>kkk</title>
    <style>
        .p1 {
            background-color: red;
        }
    </style>
</head>
<body>
    <table border="1">
        <tr>
            <td class = "p1">1</td>
            <td class = "p2">2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>4</td>
            <td>5</td>
            <td>6</td>
        </tr>
    </table>
</body>
</html>
```

进一步结合，类选择器与表现选择器结合选中设置属性。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>kkk</title>
</head>
<body>
    <button onclick="document.getElementById('kk').style.display = "none"">消失</button>
    <button onclick="document.getElementById('kk').style.display = "block"">显示</button>
    <p id= "kk" >sasdsadsad</p>
</body>
</html>
```
