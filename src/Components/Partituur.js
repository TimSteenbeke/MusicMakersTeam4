
import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';
import '../CSS/Partituur.css';
import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";

class Partituur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musicXML: '/BackendJsonSimulated/Serenade.xml',
            gp5: '/BackendJsonSimulated/Canon.gp5',
        };
    }

    componentDidMount(){
        const $ = window.$;

        // Load alphaTab
        $(this.refs.partituur).alphaTab({
            file: this.state.gp5,
            engine: 'svg',
            width: -1,
        });

        // Initialize Player and Setup Player
        var as = $(this.refs.partituur).alphaTab('playerInit');
        as.LoadSoundFont('/Libraries/Alphatab/alphaSynth/default.sf2');
        $(this.refs.partituur).alphaTab('playerCursor');

    }

    componentWillMount(){
        let response = false;
        response = LoginService.checkToken();
        console.log("response:");
        console.log(response);
        this.setState({redirect: !response})
    }

    play(){
        const $ = window.$;
        $(this.refs.partituur).alphaTab('play');
    }

    stop(){
        const $ = window.$;
        $(this.refs.partituur).alphaTab('stop');
    }

    pauze(){
        const $ = window.$;
        $(this.refs.partituur).alphaTab('pause');
    }

//this.state.gp5 --> this.props.dataFile
    render() {
        let redirecter=null;
        if (this.state.redirect) {
            redirecter = <Redirect to='/login'/>
        }
        return (
            <div>
                {redirecter}
                <input type="button" id="play" value="Play" onClick={(e) => this.play(e)}/>
                <input type="button" id="pauseBtn" value="Pauze" onClick={(e) => this.pauze(e)}/>
                <input type="button" id="stopBtn" value="Reset" onClick={(e) => this.stop(e)}/>

                <div id="AlphaTab" ref="partituur" data-tracks="0"/>
            </div>
        );
    }
}

export default Partituur;
