/**
 * Created by jariv on 3/03/2018.
 */
import React, {Component} from 'react';






class Header extends Component {

    render() {
        return (
            <div className="row">
                <div className="input-field col s6">
                    <input defaultValue={this.props.hint} id="hint" type="text" className="validate" />
                        <label className="active" htmlFor="hint">{this.props.label}</label>
                </div>
            </div>
        )
    }
}
export default Header;