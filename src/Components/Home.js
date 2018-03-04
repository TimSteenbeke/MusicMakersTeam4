<<<<<<< HEAD
import {GridList, GridTile} from 'material-ui/GridList';
import did from '../images/did.jpg'
=======
/**
 * Created by TimS on 15/02/2018.
 */

>>>>>>> master
import guitar from '../images/guitar.jpg'
import React, {Component} from 'react';
import Header from './Header'


export default class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        }
    }

    componentDidMount() {

    }

    handleChange = (event, index, value) => this.setState({value});


    render() {


        return <div className="Homepage">
<<<<<<< HEAD
            <section className="container">
                <div className="whiteBox">
                    <h1 className="header">Home</h1>
                    <Toolbar style={styles.toolbarStyle}>
                        <ToolbarGroup firstChild={true}>
                            <DropDownMenu labelStyle={styles.titleStyle} underlineStyle={styles.titleStyle}
                                          selectedMenuItemStyle={styles.errorStyle} value={this.state.value}
                                          onChange={this.handleChange}>
                                <MenuItem value={1} primaryText="Alles"/>
                                <MenuItem value={2} primaryText="Mededelingen"/>
                                <MenuItem value={3} primaryText="Nieuws"/>
                            </DropDownMenu>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <FontIcon className="muidocs-icon-custom-sort"/>
                            <ToolbarSeparator/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={styles.root}>
                        <GridList
                            cellHeight={180}
                            style={styles.gridList}
                        >
                            {tilesData.map((tile) => (
                                <GridTile
                                    key={tile.id}
                                    title={tile.title}
                                    subtitle={<span>by <b>{tile.author}</b></span>}
                                    titleStyle={styles.titleStyle}
                                >
                                    <img src={tile.img} alt="Mededeling"/>
                                </GridTile>
                            ))}
                        </GridList>
=======
            <Header name="Home"/>

            <section className="containerCss">
                <div className="card hoverable">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" alt="guitar" src={guitar} />
                    </div>
                    <div className="card-content darken-2">
                        <span className="card-title activator black-text text-darken-4">Melding<i className="material-icons right">more_vert</i></span>
                    </div>
                    <div className="card-reveal darken-2 lighten-4 black-text">
                        <span className="card-title black-text text-darken-4">Melding<i className="material-icons right">close</i></span>
                        <p className="black-text">Yes boi</p>
                    </div>
                </div>

                <div className="card hoverable">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" alt="guitar" src={guitar} />
                    </div>
                    <div className="card-content darken-2">
                        <span className="card-title activator black-text text-darken-4">Melding<i className="material-icons right">more_vert</i></span>
                    </div>
                    <div className="card-reveal darken-2 lighten-4 black-text">
                        <span className="card-title black-text text-darken-4">Melding<i className="material-icons right">close</i></span>
                        <p className="black-text">Yes boi</p>
>>>>>>> master
                    </div>
                </div>
            </section>
        </div>
    }
}