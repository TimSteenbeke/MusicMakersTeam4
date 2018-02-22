
import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';


class Partituur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musicXML: '/BackendJsonSimulated/BeetAnGeSample.mxl',
            gp5: '/BackendJsonSimulated/Canon.gp5'
        };
    }

    componentDidMount() {
        this.PartituurRenderer()
    }

    PartituurRenderer(){
        var partituur = this.refs.partituur;
        partituur.alphaTab({file: this.state.gp5, tracks: [0]})
        /*('#alphaTabScriptInit').alphaTab({
            file: 'files/features/SongDetails.gp5',
            tracks: [0]
        })*/
    }

    render() {
        return (
            <div>
                <script type="text/javascript" src="../Libraries/Alphatab/excanvas.js"/>
                <script type="text/javascript" src="../Libraries/Alphatab/alphaTab.core.js"/>
                <script type="text/javascript" src="../Libraries/Alphatab/jquery.alphaTab.min.js"/>
                <div id="AlphaTabScriptInit" ref="partituur"/>
            </div>
        );
    }
}

export default Partituur;
