import React from "react";

class Chlid extends React.Component {
  // 与视图无关的非响应式数据，写在外面即可，保持state清洁
  timer = null;
  state = {
    count: 0,
  };
  componentDidMount() {
    console.log("子组件——挂载阶段：componentDidMount");
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    }, 1000);
  }
  componentWillUnmount() {
    console.log("子组件——卸载阶段：componentWillUnmount");
    clearInterval(this.timer);
  }
  render() {
    console.log("子组件——渲染阶段：render");
    return <div>this is child component; 计时器: {this.state.count}</div>;
  }
}

class App extends React.Component {
  constructor() {
    super();
    console.log("挂载阶段：constructor");
  }
  state = {
    count: 0,
    isShow: true,
  };
  componentDidMount() {
    console.log("挂载阶段：componentDidMount");
  }
  componentDidUpdate() {
    console.log("更新阶段：componentDidUpdate");
  }
  onChange = () => {
    this.setState({
      count: this.state.count + 1,
      isShow: !this.state.isShow,
    });
  };
  render() {
    console.log("渲染阶段：render");
    return (
      <div className="App">
        this is app, {this.state.count}
        {this.state.isShow ? <Chlid /> : null}
        <button onClick={this.onChange}>按钮</button>
      </div>
    );
  }
}

export default App;
