/**
 * Created by jariv on 14/02/2018.
 */
import React, {Component} from 'react';
import {Link, Router} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ContentLink from 'material-ui/svg-icons/content/link';
import {black500, deepOrangeA700, grey500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';


const style = {
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
    style: {
        height: 500,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    }
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <AppBar
                    title="Music Makers"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={this.handleToggle}
                    style={{ backgroundColor: '#DD2C00', position: 'fixed'}}


            />
                <Drawer
                    docked={false}
                    width={200}
                    zDepth={3}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <Menu>
                        <Link to="/addInstrument">
                            <MenuItem primaryText="Add Instrument" leftIcon={<ContentLink />}/>
                        </Link>
                        <Divider />

                        <Link to="/agenda">
                            <MenuItem primaryText="Agenda" leftIcon={<ContentLink />}/>
                        </Link>
                        <Divider />

                        <Link to="/instrumenten">
                            <MenuItem primaryText="Instrumenten" leftIcon={<ContentLink />}/>
                        </Link>
                    </Menu>
                </Drawer>
            </div>


        );
    }
}
export default Sidebar;
