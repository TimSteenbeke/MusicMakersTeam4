
import React from 'react';
import Partituur from "../Components/MusicComponents/Partituur";
import Adapter from 'enzyme-adapter-react-16'
import {configure, shallow} from "enzyme";

configure({ adapter: new Adapter() });

describe('MusicScore', () => {

    it('knows that 2 and 2 make 4', () => {
        expect(2 + 2).toBe(4);
    });

    it('expects svg to be rendered', () => {
        const musicScord = shallow(<Partituur
            fileFormat="Canon.gp5"
            content="/BackendJsonSimulated/Canon.gp5"
        />);
        const svg = musicScord.find('svg');
        expect(svg).toBeDefined();
    });
});