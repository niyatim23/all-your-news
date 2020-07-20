import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./components/MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";



ReactDOM.render(
  <MainPage />,
  document.getElementById("everything")
);


/*ReactDOM.render(
  <MyInfo />, 
  document.getElementById("root")
);

function MyApp(){
  return (
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  );
}


ReactDOM.render(
	<MyApp />,
	document.getElementById("root")
  );
  

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="board-row">
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    );
  }
}

// ========================================


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

*/