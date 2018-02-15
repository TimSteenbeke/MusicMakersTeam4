import React from 'react';
import Instrument from '../Components/Instruments';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<Instrument/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});