
import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';
import * as MusicService from '../Services/MusicService.js'
import Partituur from "./Partituur";
import ChordSheet from "./ChordSheet";


class PlayMusic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPartituurId: this.props.match.params.id,
            partituur: [],
            content:[],
            hidden:false
        };
    }

    componentDidMount() {
        MusicService.getPartituurById(this.state.selectedPartituurId).then(partituur => {
            this.setState({partituur: partituur});
        });
        //this.assignItem(this.state.partituur.content);
        console.log("content hier");
        console.log(this.state.partituur);

    }

    swap(){
        this.setState({hidden :!this.state.hidden});
    }

    assignItem = (item) => { // bound arrow function handler
        const sampleBytes = PlayMusic.base64ToArrayBuffer(item);
        console.log(sampleBytes);
        this.setState({content:"hallo"});
    };

    static base64ToArrayBuffer(base64) {
        const binaryString =  window.atob(base64);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++)        {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }


    render() {
        return (
            <div className="PlayPartituur">
                <section className="container">
                    <div>
                        <h1 className="header">Play music</h1>

                        <input type="button" id="swap" value="swap" onClick={(e) => this.swap(e)}/>
                        <p>{this.state.partituur.fileFormat}</p>

                        <ChordSheet
                            hidden={!this.state.hidden}
                            dataFile={this.state.content}
                        />

                        <Partituur
                            hidden={this.state.hidden}
                            dataFile={this.state.content}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default PlayMusic;

