import React, { createRef } from "react"

class HelloComponet extends React.Component{
  refOne = createRef()
  state = {
    value: 'test',
    value2: '',
  }
  onChange = (e) => {
    this.setState({
      value: e.currentTarget.value
    })
  }
  onGetValue = () => {
    this.setState({
      value2: this.refOne.current.value
    })
  }
  render() {
    return (
      <div>
        {this.state.value}
        <input type="text" value={this.state.value} onChange={this.onChange}/>
        <br />
        {this.state.value2}
        <input type="text" ref={this.refOne}/>
        <button onClick={this.onGetValue}>获取数据</button>
      </div>
    )
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