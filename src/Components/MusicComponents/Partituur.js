import React, {Component} from 'react';
import '../../CSS/GlobalStylesheet.css';
import './Partituur.css';

export default class Partituur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden:true
        };
    }

    componentDidMount(){
        this.checkRightFormat();

    }

    checkRightFormat(){
        const fileformat = this.props.fileFormat;
        const extension = fileformat.substr(fileformat.lastIndexOf('.')+1);
        const alphaTabExtensionSupport = "gp5 gp4 gp6 gp3 xml";
        if(alphaTabExtensionSupport.indexOf(extension) > -1){
            this.setState({hidden:false});
            this.load();
        }
    }

    load(){
        const $ = window.$;

        // Load alphaTab
        $(this.refs.partituur).alphaTab({
            file: this.props.content,
            engine: 'svg',
            width: -1
        });

        // Initialize Player and Setup Player
        var as = $(this.refs.partituur).alphaTab('playerInit');
        as.LoadSoundFont('/Libraries/Alphatab/alphaSynth/default.sf2');
        $(this.refs.partituur).alphaTab('playerCursor');
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

    render() {
       return (
            <div hidden={this.state.hidden}>
                <input type="button" id="play" value="Play" onClick={(e) => this.play(e)}/>
                <input type="button" id="pauseBtn" value="Pause" onClick={(e) => this.pauze(e)}/>
                <input type="button" id="stopBtn" value="Reset" onClick={(e) => this.stop(e)}/>

                <div id="AlphaTab" ref="partituur" data-tracks="0"/>
            </div>
        );
    }
}
