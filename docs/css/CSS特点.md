---
nav:
  title: css
order: 2
---
# CSS特点

## 继承性

特性:子元素默认继承父元素的特点

可以继承的常见属(文字控制属性都可以继承)

+ color
+ font-style、font-weight、font-size、font-family
+ text-indent、text-align
+ line-height

## 层叠性

特性

+ 给一个标签设置不同的样式，此时样式会层叠叠加，会共同作用在标签上
+ 给同一个标签设置相同的样式，此时样式会层叠覆盖，最终写在最后的样式会生效

## 优先级

不同选择器具有不同优先级，优先级高的选择器样式会覆盖优先级低选择器样式

优先级公式

继承<通配符选择器<标签选择器<类选择器<行内样式<!important