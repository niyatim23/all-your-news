import React from "react";
import Joke from "./Joke"

function App(){
    
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    const styles = {
        color: "#4f4f4f", 
        backgroundColor: "red",
        fontSize: 38
    };


    const jokesData = [
        {
            id: 1,
            question: "What is your name?",
            punchLine: "Idk"
        },
        {
            id: 2,
            question: "Will things ever get better?",
            answer: "Yes they will"
        }
    ]
    const jokeComponents = jokesData.map(joke => {
        return <Joke key={joke.id} question={joke.question} punchLine={joke.punchLine}/>
    });

    //const jokeComponents2 = jokesData.map(joke => <Joke key={joke.id} question={joke.question} punchLine={joke.punchLine}/>);


    if (hours < 12){
        timeOfDay = "Morning";
    }
    else if (hours >= 12 && hours < 17){
        timeOfDay = "Afternoon";
    }
    else{
        timeOfDay = "Night";
        styles.color = "teal";
    }

    return (
        <div>
            <nav>
                <h1 style={styles}>Good {timeOfDay}</h1>
                <div>
                    {jokeComponents}
                </div>
            </nav>
        </div>
    );
}

export default App;