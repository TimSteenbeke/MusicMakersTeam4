import React, {Component} from 'react';

export default class StyledTextField extends Component {

    render() {
        return (
            <div className="row">
                <div className="input-field col s12 m12 l12">
                    <input value={this.props.value} disabled={this.props.disabled} defaultValue={this.props.hint} onChange={this.props.onChange} id="hint" type="text" className="validate" />
                        <label className="active" htmlFor="hint">{this.props.label}</label>
                </div>
            </div>
        )
    }
}
