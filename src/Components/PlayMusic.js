
import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';
import * as MusicService from '../Services/MusicService.js'
import Partituur from "./Partituur";
import ChordSheet from "./ChordSheet";


class PlayMusic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPartituurId: 1,
            partituur:[],
            hidden:true
        };
    }

    componentDidMount() {
        MusicService.getPartituurById(this.state.selectedPartituurId).then(partituur => {
            this.setState({partituur: partituur});
        });
    }

    swap(){
        this.setState({hidden :!this.state.hidden});
    }

    render() {
        return (
            <div className="PlayPartituur">
                <section className="container">
                    <div>
                        <h1 className="header">Play music</h1>

                        <input type="button" id="swap" value="swap" onClick={(e) => this.swap(e)}/>
                        <p>{this.state.partituur.naam}</p>

                        <ChordSheet
                            hidden={!this.state.hidden}
                            DataFile={this.state.partituur.dataFile}
                        />

                        <Partituur
                            hidden={this.state.hidden}
                            DataFile={this.state.partituur.dataFile}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default PlayMusic;

