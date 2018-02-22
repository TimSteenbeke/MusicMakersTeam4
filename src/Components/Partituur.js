
import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';

class Partituur extends Component {
    constructor(props) {
        super(props);
        this.state = {musicXML: '/BackendJsonSimulated/BeetAnGeSample.mxl'};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="partituur"/>
        );
    }
}

export default Partituur;
