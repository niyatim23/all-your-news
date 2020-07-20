import React from "react";
import NavigationBar from "./navbar/NavigationBar";
import { BrowserRouter } from 'react-router-dom';

class MainPage extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <NavigationBar />
            </BrowserRouter>
        );
    }
}

export default MainPage;