
import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';
import ChordSheetJS from 'chordsheetjs';



class AkoordSchema extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFile:""
        };
    }



    componentDidMount() {
        this.ParseChordSheet();

    }

    ParseChordSheet(){
        const chordSheet = `
        Am         C/G        F          C
        Let it be, let it be, let it be, let it be
        C                G              F  C/E Dm C
        Whisper words of wisdom, let it be`.substring(1);
        this.setState({dataFile: chordSheet});
    }

    ParseChordSheetPro(){
        const chordSheet = `
        {title: Let it be}
        {subtitle: ChordSheetJS example version}
        {Chorus}
        
        Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be
        [C]Whisper words of [G]wisdom, let it [F]be [C/E] [Dm] [C]`.substring(1);

        const parser = new ChordSheetJS.ChordProParser();
        this.setState({dataFile: chordSheet});
    }

    render() {

        var parser = new ChordSheetJS.ChordSheetParser();
        var song = parser.parse(this.state.dataFile);
        var formatter = new ChordSheetJS.HtmlTableFormatter();
        var disp = formatter.format(song);


        return (
            <div className="Play" hidden={this.props.hidden}>
                <section className="container">
                    <div id="whiteBox"
                        dangerouslySetInnerHTML={ {__html: disp} }>
                    </div>
                </section>
            </div>
        );
    }
}

export default AkoordSchema;

