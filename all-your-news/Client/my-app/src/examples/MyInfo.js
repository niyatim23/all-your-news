import React from "react";
import App from "./App";
import "../index.css";
import Joke from "./Joke";
import { render } from "react-dom";
import Conditional from "./Conditional";
import Promises from "./Promises";

class MyInfo extends React.Component {
  constructor(){
    super();
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1500);
  }

  /*componentDidMount() {
    let x = this;
    setTimeout(function() {
      x.setState({
        isLoading: false
      })
    }, 1500);
  }*/

  render() {
    const firstName = "Niyati";
    const lastName = "Maheshwari";
    return (
        <div>
          <h1>Niyati</h1>
          <p className="my-paragraph">Hello from {firstName + " " + lastName}</p>
          <p>My name is {`${firstName} ${lastName}`}</p>
          <p>I must've called a thousand times!</p>
          <Joke question="Who let the dogs out?" answer="WHO let the dogs out!"/>
          <Joke answer="I do not know WHO let the dogs out!"/>
          <App />
          <div>
            {this.state.isLoading ? <h1>Loading........</h1> : <Conditional />}
            <Promises />
          </div>
        </div>
    );
  }
  //this.state.unread.length > 0 && renderstuff //partial rendering
}

export default MyInfo;