# Getting Started with Create React App

- [字体库](https://fontawesome.com/icons)
- [动画库-基本-React Transition Group](https://reactcommunity.org/react-transition-group/)
- 一键自动安装 storybook
  + npx -p @storybook/cli sb init

- 本地测试
  + npm link 创建软连接到全局

- [react + ts创建项目]
  + npx create-react-app rea-ts-test --typescript

## 两个react版本的问题
- 

## 发布流程
- npm whoami 查看当前npm登陆信息
- npm config ls
- npm adduser 登陆npm网站 -> 按要求输入账号密码，加 邮箱一次性验证码
  + 注意：镜像源得设置成原来的网站 https://registry.npmjs.org/
  + npm config set registry https://registry.npm.taobao.org/
  + npm config set registry https://registry.npmjs.org/
  + [变更镜像操作](https://cloud.tencent.com/developer/article/1372949)

- [node 版本号规则](https://semver.org/lang/zh-CN/)