# HTML

## 认识网页

+ 认识网页的组成
+ 五大浏览器
+ web 标准的构成

### 网页是由什么组成的

> 文字、图片、视频、超链接

### 五大浏览器

+ IE【Trident】
+ 谷歌【blink】
+ 火狐【gecko】
+ Safari【webkit】
+ 欧朋【blink】

### web标准的构成

+ 结构	html
+ 表现    css
+ 行为    javaScript

## HTML的概念

html:超文本标记语言（英语：**H**yper**T**ext **M**arkup **L**anguage，简称：HTML）是一种用来结构化 Web 网页及其内容的标记语言

## HTML骨架的构成

+ html标签：网页的整体
+ head标签：网页的头部
+ body标签：网页的身体
+ title标签：网页的标题

<img src="https://raw.githubusercontent.com/673019334/image-oss/main/202311212218093.png" alt="image-20231121221813941" style="zoom:50%;" />

## HTML标签

#### 标题标签

+ h1-h6

#### 段落标签

+ p：段落间存在间隙，独占一行

#### 换行标签

+ br：单标签，让文字强制换行

#### 水平线标签

+ hr：单标签，在页面上显示一条水平线

#### 文字加粗

+ b

#### 下划线

+ u

#### 倾斜

+ i

#### 删除线

+ s

#### 图片标签

+ Img，如下属性
  + src：放置图片的地址(绝对地址/相对地址)
  + alt：图片加载不出来的时候显示
  + title: 鼠标放置上去的提示文字，其它的标签也适用
  + width：宽度，不需要加单位，宽高若只设置了一个，则另外一个方向自适应
  + height：高度

#### 媒体标签

+ audio（mp3、Wav、Ogg）

  + src：音频的路径

  + controls:显示播放的控件，若不加则无显示

    <img src="https://raw.githubusercontent.com/673019334/image-oss/main/202311221118743.png" alt="image-20231122111819598" style="zoom:50%;left:-30px" />

  + autoplay：自动播（部分浏览器不支持）

  + loop:循环播放

+ 视频（mp4、webM、Ogg）

  + Video
    + src：音频的路径
    + controls:显示播放的控件，若不加则无显示
    + autoplay：自动播（部分浏览器不支持）
    + loop:循环播放

#### 链接标签

+ a ：点击后从一个页面跳转到另外一个页面
  + href:链接的地址
  + target:
    + _self:默认，在当前页面打开
    + _blank：在新的页面打开

#### 列表标签

+ 无序列表

  + ul > li

+ 有序列表

  + ol>li

+ 自定义列表

  + dl dd dt

  ​     ![image-20231123090051386](https://raw.githubusercontent.com/673019334/image-oss/main/202311230900422.png)

#### **表格标签**

![image-20231127160128852](https://raw.githubusercontent.com/673019334/image-oss/main/202311271601094.png)

**table的组成**

+ caption：写在table标签内部

- thead

+ tbody
+ tfoot

```html
  <table border="1" width="200" height="200">
    <caption>单元格标题</caption>
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>性别</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="2">1-1</td>
        <td rowspan="2"> 1-2</td>
      </tr>
      <tr>
        <td>2-1</td>
        <td>2-2</td>
        <!-- <td>2-3</td> -->
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>总结1</td>
        <td>总结2</td>
        <td>总结3</td>
      </tr>
    </tfoot>
  </table>
```

**table属性**

+ width:表格的整体宽度
+ height:表格的整体高度
+ border:表格的边框

**td属性**

注意不可以跨结构合并单元格

+ colspan:横向合并单元格的个数，只保留最左侧的
+ rowspan:纵向合并单元格格数，只保留最上面的

#### 表单标签

**input**

**name属性**

+ 提交给后端的字段

**checked** 

+ 使用于单选框和多选框，默认选中状态

**type属性值**

+ text:文本框，用于输入单行文本
+ password：用于输入密码
+ radio:单选框，checked默认选中
+ checkbox:多选框
+ file:文件选择，用于文件上传
+ submit:提交按钮，用于提交
+ rest:重置按钮，用于重置
+ button:普通按钮，默认无功能,之后配合js添加功能

**button**

**type属性**

+ submit，提交按钮。点击之后交数据给后端服务器
+ reset，重置按钮，点击之后恢复表单的默认值
+ button，默认按钮，默认无功能，需要配合js添加功能

**select**

+ selected:下拉菜单的默认选中

**textarea**

+ cols：规定了文本域的可见高度
+ rows:规定文本域内可见行数

**label**

#### 语义化标签

| 标签名  | 语义       |
| ------- | ---------- |
| header  | 网页头部   |
| nav     | 网页导航   |
| footer  | 网页底部   |
| aside   | 网页侧边栏 |
| section | 网页区块   |
| article | 网页文章   |

#### 字符实体

| 字符 | 符号(后面加;) |
| ---- | ------------- |
| 空格 | &nbsp         |
| >    | &gt           |
| <    | &lt           |

