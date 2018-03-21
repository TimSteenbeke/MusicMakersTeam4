import React, {Component} from 'react';
import '../../CSS/GlobalStylesheet.css';
import * as MusicService from '../../Services/MusicService.js'
import Header from '../GeneralComponents/Header';
import Partituur from "./Partituur";
import ChordSheet from "./ChordSheet";
import './PlayMusic';

export default class PlayMusic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPartituurId: this.props.match.params.id,
            partituur: []
        };
    }

    componentDidMount() {
        MusicService.getPartituurById(this.state.selectedPartituurId).then(partituur => {
            this.setState({partituur: partituur});
            this.setState({musicObj: URL.createObjectURL(MusicService.getMusicObject(this.state.partituur.content))});
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
            <div className="PlayPartituur">
                <Header name="Play Music"/>
                        {this.state && this.state.musicSheet &&
                            <ChordSheet
                                fileFormat={this.state.partituur.fileFormat}
                                content={(this.state.musicSheet)}
                            />
                        }
                        {this.state && this.state.musicObj &&
                            <Partituur
                                fileFormat={this.state.partituur.fileFormat}
                                content={this.state.musicObj}
                            />
                        }
            </div>
        );
    }
}

