---
nav:
  title: css
order: 4
---
# CSS基本样式

## 样式属性

### 字体样式

+ **字体大小（font-size）**
  + 取值：数值+ px，单位需要设置否则无效
  + 谷歌浏览器默认文字大小是16px，支持最小像素12px
+ **字体粗细（font-weight）**
  + 取值（二选一）
    + 100-900纯数字
    + normal/blod 加粗
  + 不是所有的字体都提供了9种粗细，因此部分取值页面中无效
+ **字体样式，是否倾斜（font-style）**
  + 正常：normal
  + 倾斜:italic
+ **字体系列（font-family）**
  + 从左往右查找，如果没有安装则显示下一个
  + 如果都不支持，此时会根据操作系统，显示最后字体系列的默认字体
  + 如果字体中存在多个单词的字体就，建议使用引号包裹，最后一项系列不需要引号包裹

**font 相关属性连写**

+ 取值：font：style weight size/line-hieght family 
+ 只能省略前两个，如果省略了相当于设置了默认值
+ 如果需要同时设置单独和连写形式，需要把单独的样式写在连写的下面

**文字颜色**

+ color

**背景颜色**

background-color

### 文本样式

+ **文本缩进【text-indent】**
  + 数字+px
  + 数字+em（推荐：1em = 当前标签font-size的大小）
+ **文本水平对齐【text-align】**
  + 取值
    + left:左对齐
    + center：居中
    + right：右对齐
  + 如果需要文本水平居中，text-align属性给文本所在标签(文本的父元素)设置
  + 可以让哪些元素水平居中
    + 文本
    + span标签、a标签
    + input标签、img标签
+ **文本装饰【text-decoration】**
  + 取值
    + underline:下划线
    + line-through:删除线
    + overline:上划线
    + none:无装饰线

### 行高

> 控制一行的上下间距，行高 =  上间距+文本高度+下间距

+ 取值
  + 数字+px
  + 倍数(当前标签font-size的倍数)
+ 应用
  + 让单行文本垂直居中可以设置line-height：文字父元素高度
  + 网页精准布局时，会设置line-hieght:1,可以取消上下间距

## 标签水平居中

如何让div、p、h （块状元素）水平居中？

+ 可以通过margin:0 auto;实现，直接给当前元素本身设置即可
+ 注意
  + margin:0 auto 一般针对于固定宽度的盒子，如盒子没有设置宽度，此时会默认占满父元素的宽度

## 背景相关属性

### 背景颜色

```css
属性名 {
	background-color:red;
}
```

+ 默认是透明色

### 背景图片

```
属性名 {
	background-image:url('图片的路径');
}
```

+ url 可以省略引号
+ 图片默认在水平方向和垂直方向上面是平铺的
+ 图片仅仅是给盒子起到装饰效果，是不能撑开盒子的

### 背景平铺

```CSS
属性名 {
	background-repeat:;
}
```

+ repeat:默认值，水平和垂直都平铺
+ no-repeat:不平铺
+ repeat-x:水平方向平铺
+ repeat-y:垂直方向平铺

### 背景位置

```CSS
属性名 {
	background-position:水平方向 垂直方向;
}
```

**属性值**

+ 方位名词
  + 水平方向:left center right 
  + 垂直方向:top  center bottom
+ 数字+px
  + 原点（0,0）盒子左上角
  + x轴：水平向右
  + y轴：垂直向下
  + 将图片的左上角与坐标点重合

### 背景相关属性连写

```css
background:color image repeat postion
```

## 元素的显示模式

### 块级元素

> div、p、h 、ul、li 、dl、dt、dd、form....

+ 独占一行
+ 宽度默认是父元素的宽度，高度默认由内容撑开
+ 可以设置宽高

### 行内元素

> span、a、b、u、i、s.....

+ 一行可以显示多个
+ 宽度和高度由内容撑开
+ 不可以设置宽高

### 行内块元素

> Input、textarea、button、select

+ 一行可以显示多个
+ 可以设置宽高
+ Img 标签有行内块的特点，但是chrome调试工具结果显示inline

### 元素显示模式转换

> 改变元素默认显示特点，让元素符合布局要求

| 属性                 | 效果             |
| -------------------- | ---------------- |
| display:block        | 转换成块状元素   |
| display:inline-block | 转换成行内块元素 |
| display:inline       | 转换成行内元素   |

### 