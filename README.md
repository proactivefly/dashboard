### 技术栈

Vue3.2x +Pinia +Axios+Typescript

UI ：andv+dataV

### 启动

以下命令项目根目录执行

第一步：yarn install

第二步：npm run serve

### 编译

npm run build ——生产环境

npm run build:test ——测试环境

### 项目结构

| 文件                        | 作用/功能                                                      |
| --------------------------- | -------------------------------------------------------------- |
| main.ts                     | 主目录文件，引入注册 自定义组件、样式等数据                    |
| views/\*                    | 界面各个区域组件按照位置来命名，project/index 是项目主结构     |
| constant/\*                 | 静态数据项，所有的标题和图标都配置在这里                       |
| utils/\*                    | 全局公共函数（包含屏幕适配函数）                               |
| assets/\*                   | 静态资源目录，放置图片与全局样式（index 文件样式单独放在这里） |
| components/echart           | 封装的全局图表渲染函数                                         |
| components/componentInstall | 全局组件注册位置                                               |
| router/\*                   | 路由配置区域                                                   |
| store/\*                    | pinia 大菠萝相关区域                                           |
| types/\*.d.ts               | 全局类型声明文件                                               |

### **代码提交**

_请使用 git-cz 代替 git commit !!!_

_请使用 git-cz 代替 git commit !!!_

_请使用 git-cz 代替 git commit !!!_
