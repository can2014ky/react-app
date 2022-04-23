# 初始化环境

1. npx 的作用是临时下载 create-reacct-app 包，创建完项目会删除该包，不会留存占用空间。

```js
npx create-react-app react-app
```

2. 下载与安装 React-devtools

- github 下载：https://github.com/facebook/react-devtools/tree/v3直接下载安装包.zip就可以
- `npm i`
- `npm run build:extension:chrome` 将会在项目目录下生成一个 shell/chrome/build/unpacked 目录，这就是扩展程序包
- 打开 chrome：//extensions/，点击“加载已解压的扩展程序”加载，完成加载即可
  > 问题：用 create-react-app 工具生成 react 项目，运行时报出这个错误，刚开始以为生成项目过程中出现了什么错误，于是重新生成了很多次，一启动项目便报出错误，仔细一看错误偏向于底层代码错误，锁定报错的文件 react-refresh-runtime.development.js 和 ReactRefreshEntry.js。<br> > **报错原因分析:**
  > 报错原因是 React Developer Tools 插件版本为 3.x 版本，版本太老不兼容最新版本的react@17.0.2.而最新的 create-react-app 生成的 react 项目版本为 17.0.2 版本。<br>
  > 解决方法:
  > 下载最新的 4.x 版本的 React Developer Tools 插件：
  > https://www.crx4chrome.com/crx/3068/
  > 下载好之后，直接将.crx 文件拖拽到 Chrome 浏览器的插件扩展管理中。

# JSX 基础

特点：自身具有可编程能力来创建 HTML
最后会通过编译`React.createElement`转化成渲染函数

## JSX 语法

- JSX 中使用 js 表达式

```js
<div className="App">
  {name}
  {func()}
  {flag ? "真" : "假"}
</div>
```

- JSX 列表渲染

```js
<div className="App">
  <div>
    {list.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
</div>
```

- JSX 条件渲染

```js
<div className="App">
    { flag ? (
    <div>
        <span>this is true</span>
    </div>
    ) : 'this is false' }

    { flag && 'this is true'}
</div>

// 复杂逻辑可考虑采用函数
<div className="App">
    { getHtag(3) }
</div>
```

- JSX 样式控制 (行内 VS 类名)

```js
<div className="App">
  {<span style={{ color: "red" }}>this is inline-style</span>}
  <div className="des">this is className style</div>
  // 动态类型控制
  <div className={isShow ? "des" : ""}>动态控制类名</div>
</div>
```

# 开发工具与格式化代码等插件

待补充

# React 组件基础

- 函数式组件

```js
function Hello() {
  return <div>hello world</div>;
}

<div className="App">
  <Hello></Hello>
</div>;
```

- 类组件

```js
class HelloComponet extends React.Component {
  render() {
    return <div>this is a Class Component</div>;
  }
}

<div className="App">
  <HelloComponet></HelloComponet>
</div>;
```

- 事件绑定

```js
// 语法： on+事件名称 = {事件处理程序}
function Hello() {
  const onChange = (e) => {
    console.log("函数组件-事件触发", e);
  };
  return <div onClick={onChange}>hello world</div>;
}

class HelloComponet extends React.Component {
  // 这里使用箭头函数，是为了避免this(组件实例)的指向问题
  onChange = (e) => {
    console.log("类组件-事件触发", e);
  };
  render() {
    return <div onClick={this.onChange}>this is a Class Component</div>;
  }
}
```

- 事件传参

```js
function Hello() {
  const onChange = (e, params) => {
    console.log("函数组件-事件触发", e, params);
  };
  return <div onClick={(e) => onChange(e, "params")}>hello world</div>;
}

class HelloComponet extends React.Component {
  // 这里使用箭头函数，是为了避免this(组件实例)的指向问题
  onChange = (e, params) => {
    console.log("类组件-事件触发", e, params);
  };
  render() {
    return (
      <div onClick={(e) => this.onChange(e, "params")}>
        this is a Class Component
      </div>
    );
  }
}
```

# 组件状态 `state` （状态不可变）

> 提示：在 `react hook` 出来之前，函数式组件是没有字的状态的，所以需要通过类组件来使用组件状态。有状态组件 VS 无状态组件

```js
class HelloComponet extends React.Component {
  state = {
    count: 0,
    list: [1, 2, 3],
    obj: {
      name: "Jony",
      age: 18,
    },
  };
  onChange = () => {
    this.setState({
      count: this.state.count + 1,
      list: [...this.state.list, 4, 5],
      obj: {
        ...this.state.obj,
        name: "can",
      },
    });
  };
  render() {
    return (
      <div>
        当前数值是：{this.state.count}
        {this.state.list.map((item) => (
          <div key={item}>{item}</div>
        ))}
        <div>
          当前用户信息 {this.state.obj.name} {this.state.obj.age}
        </div>
        <button onClick={this.onChange}>切换</button>
      </div>
    );
  }
}
```

# 表单 (受控组件 VS 非受控组件 `createRef`)

```js
import React, { createRef } from "react";

class HelloComponet extends React.Component {
  refOne = createRef();
  state = {
    value: "test",
    value2: "",
  };
  onChange = (e) => {
    this.setState({
      value: e.currentTarget.value,
    });
  };
  onGetValue = () => {
    this.setState({
      value2: this.refOne.current.value,
    });
  };
  render() {
    return (
      <div>
        {this.state.value}
        <input type="text" value={this.state.value} onChange={this.onChange} />
        <br />
        {this.state.value2}
        <input type="text" ref={this.refOne} />
        <button onClick={this.onGetValue}>获取数据</button>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <HelloComponet></HelloComponet>
    </div>
  );
}

export default App;
```

# 组件通信
