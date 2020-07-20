import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import NewsCard from "../NewsCard";

const override = css`
    display: block;
    margin: auto;
`;

class Politics extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    async componentDidMount() {
        var source = this.props.newsSource ? "guardian" : "nyt";
        try {
            const response = await fetch("http://localhost:8080/section_news/" + source+ "/politics");
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
        if (error){
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
            function imageCheckerNYT(item){
                if(item.hasOwnProperty("multimedia") && (item.multimedia !== null || item.multimedia !== undefined)){
                    for(let i = 0 ; i < item.multimedia.length ; i++){
                        if(item.multimedia[i].hasOwnProperty("width") && item.multimedia[i].hasOwnProperty("url") && item.multimedia[i].width >= 2000 ){
                            return item.multimedia[i].url;
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
                if(item.hasOwnProperty("title") && (item.title !== null || item.title !== undefined)){
                    return item.title;
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
                if(item.hasOwnProperty("section") && (item.section !== null || item.section !== undefined)){
                    return item.section;
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
                if(item.hasOwnProperty("published_date") && (item.published_date !== null || item.published_date !== undefined)){
                    return item.published_date.slice(0, 10);
                }
                return "";
            }

            function descriptionCheckerGuardian(item){
                if(item.hasOwnProperty("blocks") && (item.blocks !== null || item.blocks !== undefined)){
                    if(item.blocks.hasOwnProperty("body") && (item.blocks.body !== null || item.blocks.body !== undefined)){
                        if(item.blocks.body[0].hasOwnProperty("bodyTextSummary") && 
                        (item.blocks.body[0].bodyTextSummary !== null || 
                        item.blocks.body[0].bodyTextSummary !== undefined)){
                            return item.blocks.body[0].bodyTextSummary;
                        }
                    }
                }
                return "";
            }

            function descriptionCheckerNYT(item){
                if(item.hasOwnProperty("abstract") && (item.abstract !== null || item.abstract !== undefined)){
                    return item.abstract;
                }
                return "";
            }


            if (this.props.newsSource){
                return (
                    <div>
                        {items.response.results.map(item => (
                            <NewsCard 
                                key={item.id} 
                                title={titleCheckerGuardian(item)}
                                image={imageCheckerGuardian(item)}
                                section={sectionCheckerGuardian(item)}
                                date={dateCheckerGuardian(item)}
                                description={descriptionCheckerGuardian(item)}
                                identifier={item.id}
                                newsSource={this.props.newsSource}
                            /> 
                        ))}
                    </div>
                );
            }
            else{
                const nyt_items = items.results.length > 10 ? items.results.slice(0, 10) : items.results;
                return(
                    <div>
                        {nyt_items.map(item => (
                            <NewsCard 
                                key={item.url}
                                title={titleCheckerNYT(item)}
                                image={imageCheckerNYT(item)}
                                section={sectionCheckerNYT(item)}
                                date={dateCheckerNYT(item)}
                                description={descriptionCheckerNYT(item)}
                                identifier={item.url} 
                                newsSource={this.props.newsSource}
                            />
                        ))}
                    </div>
                );
            }
        }
    }
}

export default Politics;