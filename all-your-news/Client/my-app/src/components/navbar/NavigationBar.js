import React from "react";
import Switch from "react-switch";
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { Navbar, Nav} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Route, withRouter } from 'react-router-dom';
import Home from "../content/page-sections/Home";
import World from "../content/page-sections/World";
import Politics from "../content/page-sections/Politics";
import Business from "../content/page-sections/Business";
import Technology from "../content/page-sections/Technology";
import Sports from "../content/page-sections/Sports";
import AsyncSelect from 'react-select';
import DetailedCard from "../content/details/DetailedCard";
import SearchKeyword from "../content/search/SearchKeyword";


class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            showToggle: true
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(checked) {
        this.setState({ 
            checked 
        });
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            if (location.pathname.slice(0, 9) === "/article/" || location.pathname.slice(0, 8) === "/search/") {
                this.setState({
                    showToggle: false
                });
            }
            else {
                this.setState({
                    showToggle: true
                });
            }
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        /*var key = "a248c23bba3849519f8ad3f027d36b17";
        function bingAutosuggest(query, key) {
            var endpoint = "https://niyati-maheshwari.cognitiveservices.azure.com/bing/v7.0/suggestions";
            request.setRequestHeader("Ocp-Apim-Subscription-Key", key);
            var request = new XMLHttpRequest();
            try {
                console.log(request.open("GET", endpoint + "?q=" + encodeURIComponent(query)));
            }
            catch (e) {
                return false;
            }
        }
        bingAutosuggest("tesla", key);*/

        return (
            <>
            <Navbar collapseOnSelect expand="lg" variant="dark" className="main-navbar">
                <AsyncSelect
                        cacheOptions
                        defaultOptions
                        className="mr-sm-2 search-box"
                        placeholder="Enter keyword ..."
                />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                
                    <Nav className="mr-auto">
                        <LinkContainer to="/home"><Nav.Link>Home</Nav.Link></LinkContainer>
                        <LinkContainer to="/world"><Nav.Link>World</Nav.Link></LinkContainer>
                        <LinkContainer to="/politics"><Nav.Link>Politics</Nav.Link></LinkContainer>
                        <LinkContainer to="/business"><Nav.Link>Business</Nav.Link></LinkContainer>
                        <LinkContainer to="/technology"><Nav.Link>Technology</Nav.Link></LinkContainer>
                        <LinkContainer to="/sports"><Nav.Link>Sports</Nav.Link></LinkContainer>
                    </Nav>
                
                <Nav className="ml-auto navbar-item-position">
                    <FaRegBookmark color="white" size="1.5rem" className="navbar-item-position"/>
                    {this.state.showToggle ? <Navbar.Text className="navbar-r-text">NYTimes</Navbar.Text> : null}
                    {this.state.showToggle ? <Switch 
                            onChange={this.handleChange} 
                            checked={this.state.checked}
                            onColor="#0D96F5"
                            onHandleColor="#ffffff"
                            uncheckedIcon={false}
                            checkedIcon={false}
                            className="react-switch navbar-item-position" 
                        /> : null}
                    {this.state.showToggle ? <Navbar.Text className="navbar-r-text">Guardian</Navbar.Text> : null}
            </Nav>
            </Navbar.Collapse>
            </Navbar>
            <div>
                <Route exact path="/home" component={() => <Home newsSource={this.state.checked}/>}/>
                <Route exact path="/world" component={() => <World newsSource={this.state.checked}/>}/>
                <Route exact path="/politics" component={() => <Politics newsSource={this.state.checked}/>}/>
                <Route exact path="/business" component={() => <Business newsSource={this.state.checked}/>}/>
                <Route exact path="/technology" component={() => <Technology newsSource={this.state.checked}/>}/>
                <Route exact path="/sports" component={() => <Sports newsSource={this.state.checked}/>}/>
                <Route exact path="/article/:source/*" component={DetailedCard}/>
                <Route exact path="/search/:source/*" component={SearchKeyword}/>
            </div>
            </>
        );
    }
}

export default withRouter(NavigationBar);