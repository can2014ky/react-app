import React from "react"

function ComA({ children }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

class App extends React.Component {
  state = {
    message: 'this is app'
  }
  render() {
    return (
      <div className="App">
        <ComA>
          <div>this is slot</div>
          <div>this is slot</div>
        </ComA>
      </div>
    )
  }
}

export default App;