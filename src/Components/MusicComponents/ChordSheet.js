import React, {Component} from 'react';
import '../../CSS/GlobalStylesheet.css';
import ChordSheetJS from 'chordsheetjs';
import GuitarChord from 'react-guitar-chord';
import $ from 'jquery';
import './ChordSheet.css';

export default class ChordSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFile:"",
            chord:'A',
            chordQuality:'MIN',
            hideFirst:true,
            currentChord:0,
            speed:1000,
            hidden:true
        };
        this.nextChord = this.nextChord.bind(this);
    }

    componentWillMount() {
        this.checkRightFormat();
    }
    componentDidMount(){
        this.addHover();
    }


    addHover(){
        let _this = this;
        $(".chord").hover(function() {
                let html = $(this).html();
                let htmlTrim = html.replace(/&nbsp;/g, '');
                _this.setChord(htmlTrim);
            }
            ,function () {
                _this.setState({hideFirst:true})
            });
    }

    checkRightFormat(){
        const fileformat = this.props.fileFormat;
        const extension = fileformat.substr(fileformat.lastIndexOf('.')+1);
        const alphaTabExtensionSupport = ["txt"];
        if(alphaTabExtensionSupport.indexOf(extension) > -1){
            this.setState({hidden:false});
            this.parseChordSheet();
        }
    }

    parseChordSheet(){
        const chordSheetExample = `
        Am         C/G        F          C
        Let it be, let it be, let it be, let it be
        C                G              F  C/E Dm C
        Whisper words of wisdom, let it be`.substring(1);

        const chordSheet = this.props.content;
        this.setState({dataFile: chordSheet});
    }

    parseChordSheetPro(chordSheet){
        const chordSheetExample = `
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
        let chordList = $(".chord").map(function(){return $(this).html()}).get();
        let _this = this;
        this.interval = setInterval(function() {_this.nextChord(chordList)}, this.state.speed);
    }

    nextChord(chordList){
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
        let parser = new ChordSheetJS.ChordSheetParser();
        let song = parser.parse(this.state.dataFile);
        let formatter = new ChordSheetJS.HtmlTableFormatter();
        let disp = formatter.format(song);

        return (
            <div className="Play" hidden={this.state.hidden}>
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

