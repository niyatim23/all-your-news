import React from "react";

class Promises extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            character: {}
        };
    }

    componentDidMount() {
        this.setState({
            loding: true
        })
        console.log(this.state.loading)
        fetch("https://swapi.co/api/people/1")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    character: data
                })
            })
            console.log(this.state.loading)
    }

    render() {
        const text = this.state.loading ? "Loading......promises" : this.state.character.name;
        return (
            <div>
                {text}
            </div>
        );
    }
}

export default Promises;