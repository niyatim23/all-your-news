import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
import SearchCard from "./SearchCard";

const override = css`
    display: block;
    margin: auto;
`;

class SearchKeyword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch("http://localhost:8080/search/" + this.props.match.params.source + "/" + this.props.match.params[0]);
            const json = await response.json();
            this.setState({
                items : json,
                isLoaded: true
            });
        }
        catch(error) {
            this.setState({
                isLoaded: true,
                error
            });
        }   
    }

    render() {
        const { error, isLoaded, items } = this.state;
        const guardianDefaultImage = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        const nytDefaultImage = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        if(error){
            return (
                <div>
                    {error.message}
                </div>
            );
        }
        else if(!isLoaded){
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
            //var to = "/search/" + this.props.match.params.source + "/" + this.props.match.params[0];

            function imageCheckerNYT(item){
                if(item.hasOwnProperty("multimedia") && (item.multimedia !== null || item.multimedia !== undefined)){
                    for(let i = 0 ; i < item.multimedia.length ; i++){
                        if(item.multimedia[i].hasOwnProperty("width") && item.multimedia[i].hasOwnProperty("url") && item.multimedia[i].width >= 2000 ){
                            return "https://www.nytimes.com/" + item.multimedia[i].url;
                        }
                    }
                }
                return nytDefaultImage;
            }

            function imageCheckerGuardian(item){
                if(item.hasOwnProperty("blocks") && (item.blocks !== null || item.blocks !== undefined)){
                    if(item.blocks.hasOwnProperty("main") && (item.blocks.main !== null || item.blocks.main !== undefined)){
                        if (item.blocks.main.hasOwnProperty("elements") && (item.blocks.main.elements !== null || item.blocks.main.elements !== undefined)){
                            if(item.blocks.main.elements[0].hasOwnProperty("assets") && (item.blocks.main.elements[0].assets !== null || item.blocks.main.elements[0].assets !== undefined)){
                                if(item.blocks.main.elements[0].assets.length > 0){
                                    if(item.blocks.main.elements[0].assets[item.blocks.main.elements[0].assets.length - 1].file !== undefined || 
                                        item.blocks.main.elements[0].assets[item.blocks.main.elements[0].assets.length - 1].file !== null){
                                        return item.blocks.main.elements[0].assets[item.blocks.main.elements[0].assets.length - 1].file;
                                    }
                                }
                            }
                        }
                    }
                }
                return guardianDefaultImage;
            }

            function titleCheckerGuardian(item){
                if(item.hasOwnProperty("webTitle") && (item.webTitle !== null || item.webTitle !== undefined)){
                    return item.webTitle;
                }
                return "";
            }

            function titleCheckerNYT(item){
                if(item.hasOwnProperty("headline") && (item.headline !== null || item.headline !== undefined)){
                    if(item.headline.hasOwnProperty("main") && (item.headline.main !== null || item.headline.main !== undefined))
                    return item.headline.main;
                }
                return "";
            }


            function sectionCheckerGuardian(item){
                if(item.hasOwnProperty("sectionId") && (item.sectionId !== null || item.sectionId !== undefined)){
                    return item.sectionId;
                }
                return "";
            }

            function sectionCheckerNYT(item){
                if(item.hasOwnProperty("news_desk") && (item.news_desk !== null || item.news_desk !== undefined)){
                    return item.news_desk;
                }
                return "";
            }
            
            function dateCheckerGuardian(item){
                if(item.hasOwnProperty("webPublicationDate") && (item.webPublicationDate !== null || item.webPublicationDate !== undefined)){
                    return item.webPublicationDate.slice(0, 10);
                }
                return "";
            }

            function dateCheckerNYT(item){
                if(item.hasOwnProperty("pub_date") && (item.pub_date !== null || item.pub_date !== undefined)){
                    return item.pub_date.slice(0, 10);
                }
                return "";
            }


            if (this.props.match.params.source === "guardian"){
                return (
                    <div>
                        {items.response.results.map(item => (
                            <SearchCard 
                                key={item.id} 
                                title={titleCheckerGuardian(item)}
                                image={imageCheckerGuardian(item)}
                                section={sectionCheckerGuardian(item)}
                                date={dateCheckerGuardian(item)}
                                identifier={item.id}
                                newsSource="guardian"
                            /> 
                        ))}
                    </div>
                );
            }
            else{
                const nyt_items = items.response.docs;
                return(
                    <div>
                        {nyt_items.map(item => (
                            <SearchCard 
                                key={item.web_url}
                                title={titleCheckerNYT(item)}
                                image={imageCheckerNYT(item)}
                                section={sectionCheckerNYT(item)}
                                date={dateCheckerNYT(item)}
                                identifier={item.web_url}
                                newsSource="nyt" 
                            />
                        ))}
                    </div>
                );
            }
        }
    }
}

export default SearchKeyword;