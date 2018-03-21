import React, {Component} from 'react';
import '../../CSS/GlobalStylesheet.css';
import './MusicScore.css';
import MusicControls from "./MusicControls";

export default class MusicScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden:true,
            speed:1
        };

    }

    componentDidMount(){
        this.checkRightFormat();

    }

    componentWillUnmount(){
        if (!this.state.hidden){
            const $ = window.$;
            $(this.refs.musicScore).alphaTab('stop');
        }

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
        $(this.refs.musicScore).alphaTab({
            file: this.props.content,
            engine: 'svg',
            width: -1
        });

        // Initialize Player and Setup Player

        var as = $(this.refs.musicScore).alphaTab('playerInit');
        $(this.refs.musicScore).alphaTab("playerOptions", {scrollElement: '.application'});
        as.LoadSoundFont('/Libraries/Alphatab/alphaSynth/default.sf2');

        $(this.refs.musicScore).alphaTab('playerCursor');

    }


    play(){
        const $ = window.$;
        $(this.refs.musicScore).alphaTab('play');
    }

    stop(){
        const $ = window.$;
        $(this.refs.musicScore).alphaTab('stop');
    }

    pause(){
        const $ = window.$;
        $(this.refs.musicScore).alphaTab('pause');
    }


    render() {

       return (
            <div hidden={this.state.hidden} id="ScorePlayer">
                <MusicControls
                play={(e) => this.play(e)}
                pause={(e) => this.pause(e)}
                stop={(e) => this.stop(e)}
                />
                <div id="AlphaTab" ref="musicScore" data-tracks="0"/>
            </div>
        );
    }
}
