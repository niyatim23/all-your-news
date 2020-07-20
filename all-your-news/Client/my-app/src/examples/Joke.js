import React from "react"


/*function Joke(props){
    const nums = [1,2,3,4,5,6,7,8,9];
    const doubled = nums.map(function(num){
        return num * 2;
    });
    


    return (
        <div>
            <h3 style = {{display : props.question ? "block" :  "none"}}>Question : {props.question}</h3>
            <h3>Answer: {props.answer}</h3>
        </div>
    );
}*/
class Joke extends React.Component{
    constructor(){
        super(); //goes to parent class and gets some goodies for us to use
        this.state = {
            answer: "Yessss", 
            count: 1
        };
        this.changeState = this.changeState.bind(this);
    }
    componentDidMount(){
        //called when a component is going to render for the first time
        //can be used for an API Call
    }
    componentWillReceiveProps(nextProps){
        //runs each time a component is mounted and everytime a parent component hands props to a child component
        //going to be deprecated
    }
    componentWillUnmount(){
        //to remove something from the screen 
        // remove event listener
    }
    myMethod(){
        return "Helloooo!!!! from myMethod";
    }
    handleClick(){
        console.log("I can handle anything!!");
    }
    /*changeState(){
        this.setState(prevState => {
            return {
                count: prevState.count / 2
            };
        });
    }*/

    changeState(){
        this.setState(function(prevState) {
            return {
                count: prevState.count / 2
            };
        });
    }



    handleChange(id){
        this.setState(prevState => {
            const updatedTodoList = prevState.todos.map(todo => {
                if (todo.id === id){
                    todo.completed = !todo.completed;
                }
                return todo;
            })
            return {
                todo: updatedTodoList
            } 
        })
    }

    render(){
        const string = this.myMethod();
        return (
            <div>
                <h6>{string}</h6>
                <h3 style = {{display : this.props.question ? "block" :  "none"}}>Question : {this.props.question}</h3>
                <h3>Answer: {this.props.answer}</h3>
                <h2>Is state important to know?</h2>
                <h2>Answer: {this.state.answer}</h2>
                <button onClick={function (){ console.log("I was clicked!!");}}>Click me once</button>
                <button onClick={() => { console.log("I was clicked 2!!");}}>Click me twice</button>
                <button onClick={this.handleClick}>Click me once</button>
                <h1>{this.state.count}</h1>
                <button onClick={this.changeState}>Change State</button>
            </div>
        );
    };
}

export default Joke;