
import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';
import * as MusicService from '../Services/MusicService.js'
import Partituur from "./Partituur";


class PlayMusic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPartituurId: 1,
            partituur:[]
        };
    }

    componentDidMount() {
        MusicService.getPartituurById(this.state.selectedPartituurId).then(partituur => {
            this.setState({partituur: partituur});
        });
    }

    render() {
        return (
            <div className="PlayPartituur">
                <section className="container">
                    <div className="whiteBox">
                        <h1 className="header">Play music</h1>
                        <p>{this.state.partituur.naam}</p>
                        <p>{this.state.partituur.id}</p>
                        <Partituur />
                    </div>
                </section>
            </div>
        );
    }
}

export default PlayMusic;

