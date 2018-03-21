import React, {Component} from 'react';
import '../../CSS/GlobalStylesheet.css';
import * as MusicService from '../../Services/MusicService.js'
import Header from '../GeneralComponents/Header';
import MusicScore from "./MusicScore";
import ChordSheet from "./ChordSheet";
import './PlayMusic';

export default class PlayMusic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMusicScoreId: this.props.match.params.id,
            musicScore: []
        };
    }

    componentDidMount() {
        MusicService.getPartituurById(this.state.selectedMusicScoreId).then(musicScore => {
            this.setState({musicScore: musicScore});
            this.setState({musicObj: URL.createObjectURL(MusicService.getMusicObject(this.state.musicScore.content))});
            this.readTextFile(this.state.musicObj);
        });
    }

    readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            this.setState({
                musicSheet: rawFile.responseText
            });
        };
        rawFile.send(null);
    }

    render() {
        return (
            <div className="Homepage">
                <Header name="Play Music"/>
                <div className="PlayPartituur">
                    {this.state && this.state.musicSheet &&
                    <ChordSheet
                        fileFormat={this.state.musicScore.fileFormat}
                        content={(this.state.musicSheet)}
                    />
                    }
                    {this.state && this.state.musicObj &&
                    <MusicScore
                        fileFormat={this.state.musicScore.fileFormat}
                        content={this.state.musicObj}
                    />
                    }
                </div>
            </div>
        );
    }
}

