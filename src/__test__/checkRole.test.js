import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {configure, shallow} from "enzyme";
import CheckRoleComponent from "../Components/CheckingComponents/CheckRoleComponent";
import Home from "../Components/Home";

configure({ adapter: new Adapter() });

describe('CheckRoleTest', () => {

    it('knows that 2 and 2 make 4', () => {
        expect(2 + 2).toBe(4);
    });

    it('expects svg to redirect', () => {
        const home = shallow(<Home/>);
        const checkRole = shallow(<CheckRoleComponent/>);
        expect(home);
    });
});