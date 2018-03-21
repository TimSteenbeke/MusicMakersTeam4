import React, {Component} from 'react';
import '../../CSS/GlobalStylesheet.css';

export default class MusicControls extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
    play(){
        this.props.play();
    }

    stop(){
        this.props.stop();

    }

    pause(){
        this.props.pause();
    }


    render() {
        return (
                <div id="controls" className="deep-orange darken-4">
                    <a className="waves-effect deep-orange darken-4 waves-light btn" onClick={(e) => this.props.play(e)}>
                        <i className="material-icons">play_arrow</i>
                    </a>
                    <a className="waves-effect deep-orange darken-4 waves-light btn" onClick={(e) => this.props.pause(e)}>
                        <i className="material-icons">pause</i>
                    </a>
                    <a className="waves-effect deep-orange darken-4 waves-light btn"  onClick={(e) => this.props.stop(e)}>
                        <i className="material-icons">replay</i>
                    </a>
                </div>
        );
    }
}
