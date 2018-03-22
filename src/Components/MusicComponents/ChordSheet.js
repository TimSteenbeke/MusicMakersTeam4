import React, {Component} from 'react';
import '../../CSS/GlobalStylesheet.css';
import ChordSheetJS from 'chordsheetjs';
import GuitarChord from 'react-guitar-chord';
import $ from 'jquery';
import './ChordSheet.css';
import MusicControls from "./MusicControls";

export default class ChordSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            dataFile: "",
            chord: 'A',
            chordQuality: 'MIN',
            hideFirst: true,
            currentChord: 0,
            speed: 1000,
            hidden: true,
            scrollTop: 0,
            scrollInterval: {}
        };
        this.nextChord = this.nextChord.bind(this);
    }

    componentWillMount() {
        this.checkRightFormat();
    }

    componentDidMount() {
        this.addHover();
    }


    addHover() {
        let _this = this;
        $(".chord").hover(function () {
                let html = $(this).html();
                let htmlTrim = html.replace(/&nbsp;/g, '');
                _this.setChord(htmlTrim);
            }
            , function () {
                _this.setState({hideFirst: true})
            });
    }

    checkRightFormat() {
        const fileformat = this.props.fileFormat;
        const fileName = fileformat.substr(0, fileformat.lastIndexOf('.'));
        const extension = fileformat.substr(fileformat.lastIndexOf('.') + 1);
        const alphaTabExtensionSupport = ["txt"];
        if (alphaTabExtensionSupport.indexOf(extension) > -1) {
            this.setState({hidden: false, fileName: fileName});
            this.parseChordSheet();
        }
    }

    parseChordSheet() {
        const chordSheet = this.props.content;
        this.setState({dataFile: chordSheet});
    }


    setChord(chord) {
        if (chord.charAt(1) === 'm') {
            this.setState({chordQuality: 'MIN'})
        } else {
            this.setState({chordQuality: 'MAJ'})
        }
        this.setState({chord: chord.charAt(0)});
        this.setState({hideFirst: false});
    }

    play() {
        let chordList = $(".chord").map(function () {
            return $(this).html()
        }).get();
        let _this = this;
        this.interval = setInterval(function () {
            _this.nextChord(chordList);
        }, this.state.speed);
       this.state.scrollInterval = setInterval(function () {
            $('.application').animate({
                scrollTop:_this.state.scrollTop + 'px'
            });
           _this.setState({scrollTop: _this.state.scrollTop+100});
       }, 4000);

    }

    nextChord(chordList) {
        if (this.state.currentChord < chordList.length) {
            this.setChord(chordList[this.state.currentChord]);
            this.setState({currentChord: this.state.currentChord + 1});
        }
    }

    pause() {
        clearInterval((this.interval));
        clearInterval((this.state.scrollInterval));
    }

    stop() {
        this.setState({hideFirst: true});
        this.setState({currentChord: 0});
        this.setState({scrollTop: 0});
        clearInterval((this.interval));
        clearInterval((this.state.scrollInterval));

    }

    render() {
        let parser = new ChordSheetJS.ChordSheetParser();
        let song = parser.parse(this.state.dataFile);
        let formatter = new ChordSheetJS.HtmlTableFormatter();
        let disp = formatter.format(song);

        return (

            <div className="Play" hidden={this.state.hidden}>
                <MusicControls
                    play={(e) => this.play(e)}
                    pause={(e) => this.pause(e)}
                    stop={(e) => this.stop(e)}
                />

                <div className="row">
                    <div className="col s8">
                        <div className="row">
                            <h5 className="headerboi">{this.state.fileName}</h5>

                            <section className="sheet">

                                <div id="chordSheet"
                                     dangerouslySetInnerHTML={ {__html: disp} }>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="row rightInfo">

                            <section className="section guitarChord">
                                <GuitarChord chord={this.state.chord} quality={this.state.chordQuality}
                                             hidden={this.state.hideFirst}/>
                            </section>
                            <div className="divider"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

