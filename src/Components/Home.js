/**
 * Created by TimS on 15/02/2018.
 */

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import React, {Component} from 'react';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
    },
};

const tilesData = [
    {
        id: 1,
        img:  '../images/drum.jpg',
        title: 'Gitaarles gaat niet door.',
        author: 'Admin',
    },
    {
        id: 2,
        img: '../images/did.jpg',
        title: 'Geen doritos meenemen in de les.',
        author: 'Admin',
    },
    {
        id: 3,
        img: '../images/guitar.jpg',
        title: 'Fedoras ook thuislaten.',
        author: 'Admin',
    },
    {
        id: 4,
        img: '../images/guitar.jpg',
        title: 'Crawling in my skin.',
        author: 'Admin',
    },
];

export default class Home extends Component{


    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){

    }

    render(){
        return <div className="Homepage">
            <section className="container">
                <div className="whiteBox">
                    <h1 className="header">Home</h1>
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
                                    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
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