/**
 * Created by jariv on 3/03/2018.
 */
import React, {Component} from 'react';


class Header extends Component {

    render() {
        return (
            <div className="navbar-fixed">
                <nav className="nav">
                    <div className="nav-wrapper orange grey darken-4">
                        <a className="brand-logo">{this.props.name}</a>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Header;