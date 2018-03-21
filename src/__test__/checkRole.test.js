import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {configure, shallow} from "enzyme";
import CheckRoleComponent from "../Components/GeneralComponents/CheckRoleComponent";

configure({ adapter: new Adapter() });

describe('CheckRoleTest', () => {

    it('knows that 2 and 2 make 4', () => {
        expect(2 + 2).toBe(4);
    });

    it('expects svg to redirect', () => {
        const checkRole = shallow(<CheckRoleComponent/>);
        const svg = checkRole.find('svg');
        expect(svg).toBeDefined();
    });
});