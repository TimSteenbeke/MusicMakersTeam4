/**
 * Created by TimS on 15/02/2018.
 */

import {GridList, GridTile} from 'material-ui/GridList';
import did from '../images/did.jpg'
import guitar from '../images/guitar.jpg'
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import {white, deepOrangeA700} from 'material-ui/styles/colors';

import React, {Component} from 'react';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {

        height: "100%",
        overflowY: 'auto',
    },
    titleStyle: {
        color: white,
    },
    toolbarStyle: {
        backgroundColor: "#DD2C00",
        width: "100%"
    },
    errorStyle: {
        color: deepOrangeA700,

    },
};

const tilesData = [
    {
        id: 1,
        img: {did}.did,
        title: 'Gitaarles gaat niet door.',
        author: 'Admin',
    },
    {
        id: 2,
        img: {did}.did,
        title: 'Geen doritos meenemen in de les.',
        author: 'Admin',
    },
    {
        id: 3,
        img: {guitar}.guitar,
        title: 'Fedoras ook thuislaten.',
        author: 'Admin',
    },
    {
        id: 4,
        img: {guitar}.guitar,
        title: 'Crawling in my skin.',
        author: 'Admin',
    },
    {
        id: 5,
        img: {guitar}.guitar,
        title: 'Crawling in my skin.',
        author: 'Admin',
    },
    {
        id: 6,
        img: {guitar}.guitar,
        title: 'Crawling in my skin.',
        author: 'Admin',
    },
];

export default class Home extends Component{


    constructor(props){
        super(props);
        this.state = {
            value: 1,
        }
    }

    componentDidMount(){

    }

    handleChange = (event, index, value) => this.setState({value});


    render(){


        return <div className="Homepage">
            <section className="container">
                <div className="whiteBox">
                    <h1 className="header">Home</h1>
                    <Toolbar style={styles.toolbarStyle}>
                        <ToolbarGroup firstChild={true}>
                            <DropDownMenu underlineStyle={styles.titleStyle} selectedMenuItemStyle={styles.errorStyle} value={this.state.value} onChange={this.handleChange}>
                                <MenuItem value={1} primaryText="Alles" />
                                <MenuItem value={2} primaryText="Mededelingen" />
                                <MenuItem value={3} primaryText="Nieuws" />
                            </DropDownMenu>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <FontIcon className="muidocs-icon-custom-sort" />
                            <ToolbarSeparator />
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
                                    <img src={tile.img} alt="Mededeling" />
                                </GridTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </section>
        </div>
    }
}