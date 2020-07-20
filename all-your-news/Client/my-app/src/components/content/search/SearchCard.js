import React from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

class SearchCard extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const identifier = this.props.identifier;
        const source = this.props.newsSource;
        const title = this.props.title;
        const image = this.props.image;
        const section = this.props.section;
        const date = this.props.date;
        const to = "/article/" + source + "/" + identifier;
        return (
            <Link to={to}>
                <Card>
                    <Card.Body>{title}</Card.Body>
                    <Card.Body>{image}</Card.Body>
                    <Card.Body>{section}</Card.Body>
                    <Card.Body>{date}</Card.Body>
                </Card>
            </Link>
        );
    }
}

export default SearchCard;