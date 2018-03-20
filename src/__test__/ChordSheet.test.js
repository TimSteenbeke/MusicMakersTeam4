import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {configure, mount, render, shallow} from "enzyme";
import ChordSheet from "../Components/MusicComponents/ChordSheet";
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });


describe('ChordSheet', () => {

    it('expects .chord to be rendered', () => {
        const content = `
        Am         C/G        F          C
        Let it be, let it be, let it be, let it be
        C                G              F  C/E Dm C
        Whisper words of wisdom, let it be`.substring(1);
        const musicScore = shallow(<ChordSheet
            fileFormat="letItBe.txt"
            content={content}
        />);
        const chord = musicScore.find('.chord').first();
        expect(chord).toBeDefined();
    });
});