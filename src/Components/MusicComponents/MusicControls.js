import React, {Component} from 'react';
import '../../CSS/GlobalStylesheet.css';
import './MusicControls.css';

export default class MusicControls extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div>
                    <div className="controls navbar">
                        <nav className="nav">
                            <div className="nav-wrapper orange deep-orange darken-4">
                                <ul id="nav-mobile" className="left hide-on-small-and-down">
                                    <li>  <a className="waves-effect deep-orange darken-4 waves-light btn" onClick={(e) => this.props.play(e)}>
                                        <i className="material-icons">play_arrow</i>
                                    </a></li>
                                    <li>   <a className="waves-effect deep-orange darken-4 waves-light btn" onClick={(e) => this.props.pause(e)}>
                                        <i className="material-icons">pause</i>
                                    </a></li>
                                    <li>  <a className="waves-effect deep-orange darken-4 waves-light btn"  onClick={(e) => this.props.stop(e)}>
                                        <i className="material-icons">replay</i>
                                    </a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
        );
    }
}
