import React, {Component} from 'react';

export default class Header extends Component {

    render() {
        return (
            <div className="navbar-fixed">
                <nav className="nav">
                    <div className="nav-wrapper orange deep-orange darken-4">
                        <a className="brand-logo">{this.props.name}</a>
                    </div>
                </nav>
            </div>
        )
    }
}
