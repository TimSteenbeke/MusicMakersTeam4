
import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';
import * as MusicService from '../Services/MusicService.js'
import Partituur from "./Partituur";
import * as LoginService from "../Services/LoginService";
import Redirect from "react-router-dom/es/Redirect";


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

    componentWillMount(){
        let response = false;
        response = LoginService.checkToken();
        console.log("response:");
        console.log(response);
        this.setState({redirect: !response})
    }

    render() {
        let redirecter=null;
        if (this.state.redirect) {
            redirecter = <Redirect to='/login'/>
        }
        return (
            <div className="PlayPartituur">
                {redirecter}
                <section className="container">
                    <div className="whiteBoxPartituur">
                        <h1 className="header">Play music</h1>
                        <p>{this.state.partituur.naam}</p>

                        <Partituur
                            DataFile={this.state.partituur.dataFile}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default PlayMusic;

