---
nav:
  title: css
order: 10
---

# boxshadow

> 用于在元素的框架上添加阴影效果，让元素看起来有立体感。

## 语法

+ 在同一个元素上可以设置多个阴影效果，使用逗号隔开
+ 属性值包括X轴偏移量、Y轴偏移量、模糊半径、扩散半径和颜色
  + 当给出2-4个值时，解释如下
    + 当只有两个值的时候代表：X轴偏移量、Y轴偏移量
    + 如果给出第三个距离值，第三个值将会被当做模糊半径解释
    + 如果给出第四个距离值，第四个值将会被当成扩散半径
  + Inset 可选值。代表内阴影，如果添加放在第一位，盒子的阴影效果会出现在内部。如果内有指定则默认出现在外部，是盒子的外边框。

## 取值

**offset-x offset-y**

用来设置阴影偏移。x:水平偏移,y:垂直偏移。

+ x正值位于元素的右侧，负值位于元素的左侧
+ y正值位于元素的下侧，正值位于元素的上侧
+ 如果两者都是0，位于元素的正后方

**blur-radius**

这是第三个值。值越大，模糊半径越大，阴影越大就越淡。不能为负值。默认为0。

**spread-radius**

这是第四个值。取正值时，阴影扩大；取负值时阴影收缩。

## demo

### 扩散效果

相当于添加了4px的边框

```css
<div id="box"></div>
#box {
  width: 100px;
  height: 100px;
  background-color: rgb(111, 186, 252);
  box-shadow: 0px 0px 0px 4px red;
}
```



![image-20230919142945547](https://raw.githubusercontent.com/673019334/image-oss/main/202309191429596.png)

### 模糊效果

```css
 box-shadow: 0px 0px 4px 4px red;
```



![image-20230919143248865](https://raw.githubusercontent.com/673019334/image-oss/main/202309191432902.png)

### 偏移效果

```css
 box-shadow: 4px 4px 0px 0px red;
```

![image-20230919143432622](https://raw.githubusercontent.com/673019334/image-oss/main/202309191434658.png)

### 偏移+模糊

```CSS
box-shadow: 4px 4px 4px  red;
```

![image-20230919143534634](https://raw.githubusercontent.com/673019334/image-oss/main/202309191435671.png)

### 偏移+模糊 +扩散

```css
box-shadow: 4px 4px 4px 4px red;
```

![image-20230919143626512](https://raw.githubusercontent.com/673019334/image-oss/main/202309191436549.png)