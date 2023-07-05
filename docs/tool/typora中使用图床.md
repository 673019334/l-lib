# typora 中使用 github 图床

## 1.下载 picgo

https://github.com/Molunerfinn/PicGo/releases

- 此处用的版本用的较老,往下翻就可以看到
- 下载稳定版本，安装

![image-20230704234912405](https://raw.githubusercontent.com/673019334/image-oss/main/20230704-picgo-download.png)

- 安装完成后会出现如下页面

  <img src="https://raw.githubusercontent.com/673019334/image-oss/main/20230704-picgopage.png" alt="image-20230704235140970" style="zoom:50%;" />

## 2.github 仓库创建

> 创建一个图片仓库，用于存储图片

- 创建仓库

  - 在 github 上创建一个新的项目,记下你取的仓库名。

  - 生成一个 token 用于 PicGo 操作你的仓库

    - https://github.com/settings/tokens

    - 然后点击`Generate new token`

      ![image-20230705000251611](https://raw.githubusercontent.com/673019334/image-oss/main/202307050003996.png)

    - 把 repo 的勾打上即可。然后翻到页面最底部，点击`Generate token`的绿色按钮生成 token

      ![image-20230705000126734](https://raw.githubusercontent.com/673019334/image-oss/main/20230705-token2.png)

    - **注意：**这个 token 生成后只会显示一次！你要把这个 token 复制一下存到其他地方以备以后要用。

      ![image-20230705000521625](https://raw.githubusercontent.com/673019334/image-oss/main/202307050005673.png)

## **3.** 配置 PicGo

点击主窗口进行配置

- 此处讲的是 github 图床配置

  ```JSON
  {
    "repo": "", // 仓库名，格式是username/github仓库名称
    "token": "", // github token
    "path": "", // 自定义存储路径，比如img/
    "customUrl": "", // 自定义域名，注意要加http://或者https://
    "branch": "" // 分支名，默认是main
  }
  ```

  ![image-20230704235329143](https://raw.githubusercontent.com/673019334/image-oss/main/20230704-picgo-setting.png)

  ![image-20230705001013523](https://raw.githubusercontent.com/673019334/image-oss/main/202307050010572.png)

  至此配置完毕，已经可以使用了。当你上传的时候，你会发现你的仓库里也会增加新的图片了：

  ![image-20230705000900152](https://raw.githubusercontent.com/673019334/image-oss/main/202307050009218.png)

## 4. typora 配置

- 如果上面不能上传则进行配置

![image-20230705001147601](https://raw.githubusercontent.com/673019334/image-oss/main/202307050011690.png)
