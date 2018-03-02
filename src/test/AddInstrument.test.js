import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import AddInstrument from '../Components/AddInstrument'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom'

require('es6-promise').polyfill();
require('isomorphic-fetch');

it("renders an h1", function () {
    var component = ReactTestUtils.renderIntoDocument(
        <MuiThemeProvider>
        <AddInstrument />
        </MuiThemeProvider>
    );

    var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(
        component, 'h1'
    );

    expect(h1.textContent).toEqual("Voeg Instrument Toe");

    var header = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'header');

    expect(ReactTestUtils.isDOMComponent(header)).toBe(true);
    expect(header.textContent).toEqual("Voeg Instrument Toe");

});

describe("Testing a form", () => {

    it("can fill out the form", () => {
        var component = ReactTestUtils.renderIntoDocument(
            <MuiThemeProvider>
                <AddInstrument />
            </MuiThemeProvider>
        );


        var namefield = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'nameField');
        ReactDOM.findDOMNode(namefield).value = 'Test';
        console.log(namefield.value);
        expect(namefield.value).toEqual("Test");

        var typeField = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'typeField');
        ReactDOM.findDOMNode(typeField).value = 'Test';
        console.log(typeField.value);
        expect(typeField.value).toEqual("Test");

        var versionField = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'versionField');
        ReactDOM.findDOMNode(versionField).value = 'Test';
        console.log(versionField.value);
        expect(versionField.value).toEqual("Test");

        var button = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'inputIntrumentButton');
        ReactTestUtils.Simulate.click(button);


    });

});