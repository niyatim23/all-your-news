import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { Card } from "react-bootstrap";

const override = css`
    display: block;
    margin: auto;
`;

class DetailedCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch("http://localhost:8080/get_article/" + this.props.match.params.source + "/?identifier=" + this.props.match.params[0] );
            const json = await response.json();
            this.setState({
                items: json,
                isLoaded: true
            });
        }
        catch(error) {
            this.setState({
                isLoaded: true,
                error
            });
        } 
        /*console.log(this.props);
        console.log("http://localhost:8080/get_article/" + this.props.match.params.source + "/?identifier=" + this.props.match.params[0] );
        console.log(this.state.items);  */
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if(error) {
            return (
                <div>
                    {error.message}
                </div>
            );
        }
        else if(!isLoaded) { 
            return (
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-md-6">
                        Loading
                        <BounceLoader
                            css={override}
                            size={45}
                            color={"#304AC3"}
                            loading={this.state.loading}
                        />
                    </div>
                </div>
            );
        }
        else{
            const guardianDefaultImage = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
            const nytDefaultImage = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            if (this.props.match.params.source === "guardian") {
                const guardianData = items.response.content;
                const multimediaLength = guardianData.blocks.main.elements[0].assets.length;
                const title = guardianData.webTitle;
                const image = (multimediaLength > 0 
                                && ((guardianData.blocks.main.elements[0].assets[multimediaLength - 1].file !== undefined) 
                                    || (guardianData.blocks.main.elements[0].assets[multimediaLength - 1].file !== null)))
                                ? guardianData.blocks.main.elements[0].assets[multimediaLength - 1].file
                                : guardianDefaultImage; 
                const date = guardianData.webPublicationDate;
                const description = guardianData.blocks.body[0].bodyTextSummary;
    
                /*console.log(title);
                console.log(image);
                console.log(date);
                console.log(description);*/

                return (
                    <Card>
                        <Card.Body>{title}</Card.Body>
                        <Card.Body>{image}</Card.Body>
                        <Card.Body>{date}</Card.Body>
                        <Card.Body>{description}</Card.Body>
                    </Card>
                );
            }
            else {

                function imageCheckerNYT(multimedia){
                    for(let i = 0 ; i < multimedia.length ; i++){
                        if(multimedia[i].width >= 2000){
                            return multimedia[i].url;
                        }
                    }
                    return nytDefaultImage;
                }

                const nytData = items.response.docs[0];
                const title = nytData.headline.main;
                const image = imageCheckerNYT(nytData.multimedia);
                const date = nytData.pub_date;
                const description = nytData.abstract;

                /*console.log(title);
                console.log(image);
                console.log(date);
                console.log(description);*/

                return (
                    <Card>
                        <Card.Body>{title}</Card.Body>
                        <Card.Body>{image}</Card.Body>
                        <Card.Body>{date}</Card.Body>
                        <Card.Body>{description}</Card.Body>
                    </Card>
                );
            }
        }
    }
}
export default DetailedCard;