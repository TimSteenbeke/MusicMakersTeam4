import React, {Component} from 'react';
import Home from "./Components/Home";
import NavigationBar from "./Components/NavigationBar";


export default class App extends Component {
    render() {
        return (
            <div className="App">
                <NavigationBar/>
                <Home/>
            </div>
        );
    }
}
