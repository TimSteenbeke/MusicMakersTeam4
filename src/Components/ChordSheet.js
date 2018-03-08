
import React, {Component} from 'react';
import '../CSS/GlobalStylesheet.css';
import ChordSheetJS from 'chordsheetjs';
import GuitarChord from 'react-guitar-chord';
import $ from 'jquery';

class ChordSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFile:"",
            chord:'A',
            chordQuality:'MIN',
            hideFirst:true,
            currentChord:0,
            speed:1000
        };

        this.nextChord = this.nextChord.bind(this);
    }

    componentDidMount() {
        this.parseChordSheet();
    }

    componentWillReceiveProps(){
        let _this = this;
        $(".chord").hover(function() {
                var html = $(this).html();
                var htmlTrim = html.replace(/&nbsp;/g, '');
                _this.setChord(htmlTrim);
            }
            ,function () {
                _this.setState({hideFirst:true})
            });
    }

    parseChordSheet(){
        const chordSheet = `
        Am         C/G        F          C
        Let it be, let it be, let it be, let it be
        C                G              F  C/E Dm C
        Whisper words of wisdom, let it be`.substring(1);
        this.setState({dataFile: chordSheet});
    }

    parseChordSheetPro(){
        const chordSheet = `
{title: Let it be}
{subtitle: ChordSheetJS example version}
{Chorus}
 
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be
[C]Whisper words of [G]wisdom, let it [F]be [C/E] [Dm] [C]`.substring(1);

        const parser = new ChordSheetJS.ChordProParser();
        this.setState({dataFile: chordSheet});
    }


    setChord(chord){
        if(chord.charAt(1)=== 'm'){
            this.setState({chordQuality:'MIN'})
        }else{
            this.setState({chordQuality:'MAJ'})
        }
        this.setState({chord:chord.charAt(0)});
        this.setState({hideFirst:false});
    }

    play(){
        var chordList = $(".chord").map(function(){return $(this).html()}).get();
        var _this = this;
        this.interval = setInterval(function() {_this.nextChord(chordList)}, this.state.speed);
        console.log(this.interval);
    }

    nextChord(chordList){
        console.log("hi");
        if(this.state.currentChord < chordList.length){
            this.setChord(chordList[this.state.currentChord]);
            this.setState({currentChord:this.state.currentChord+1});
        }
    }

    pauze(){
        clearInterval((this.interval));
    }

    reset(){
        this.setState({hideFirst:true});
        this.setState({currentChord:0});
        clearInterval((this.interval));
    }

    render() {

        var parser = new ChordSheetJS.ChordSheetParser();
        var song = parser.parse(this.state.dataFile);
        var formatter = new ChordSheetJS.HtmlTableFormatter();
        var disp = formatter.format(song);

        return (
            <div className="Play" hidden={this.props.hidden}>
                <input type="button" id="play" value="Play" onClick={(e) => this.play(e)}/>
                <input type="button" id="pauseBtn" value="Pause" onClick={(e) => this.pauze(e)}/>
                <input type="button" id="stopBtn" value="Reset" onClick={(e) => this.reset(e)}/>
                <section className="sheet">
                    <div id="whiteBox"
                        dangerouslySetInnerHTML={ {__html: disp} }>
                    </div>
                </section>
                <section className="guitarChord">
                <GuitarChord chord={this.state.chord} quality={this.state.chordQuality} hidden={this.state.hideFirst} />
                </section>
            </div>
        );
    }
}

export default ChordSheet;

