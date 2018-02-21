import React, {Component} from 'react';
import { ReactAgenda , guid  } from 'react-agenda';
import * as AgendaService from '../Services/AgendaService'
import RaisedButton from 'material-ui/RaisedButton';

require('moment/locale/nl.js');


var colors= {
    'color-1':"rgba(102, 195, 131 , 1)" ,
    "color-2":"rgba(242, 177, 52, 1)" ,
    "color-3":"rgba(235, 85, 59, 1)"
};

var now = new Date();



var AgendaItem = function(props){
    console.log( ' ik ga renderen:' , props);
    console.log(props);
    return <div className="agendaItem">
        <h3> {props.item.name} </h3>
        <p>leerkracht: {props.leerkrachten}</p>
        <RaisedButton fullWidth={true} onClick={()=> props.edit(props.item)}>Edit </RaisedButton>
    </div>
};

class Agenda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selected:[],
            cellHeight:30,
            showModal:false,
            locale:"nl",
            rowsPerHour:2,
            numberOfDays:4,
            startDate: new Date(),
            agendaItems: [],
            agendaOwner: ""
        };
        this.handleCellSelection = this.handleCellSelection.bind(this);
        this.handleItemEdit = this.handleItemEdit.bind(this);
        this.handleRangeSelection = this.handleRangeSelection.bind(this)
    }

    componentDidMount() {
        this.haalAgendaItemsOp();
    }


    haalAgendaItemsOp() {
        //HARDCODED ID (TEMPORARY)
        let mijnAgendaItems= [];

        AgendaService.getAgendaById(2).then(agendaItems => {

            //Eigenaar toewijzen (Agenda van: ....)
            // this.setState({agendaOwner: agendaItems.agendaEigenaar})


            //Over lessons loopen en info in AgendaItem steken
            //type en basic info
            for (var i= 0; i < agendaItems.lessons.length; i++) {
                let optreden = {
                    _id: guid(),
                    name: "Les coming soon (relatie ligt nog niet)",
                    startDateTime: new Date(agendaItems.lessons[i].startDateTime),
                    endDateTime: new Date(agendaItems.lessons[i].endDateTime),
                    type: 'Les',
                    classes: 'color-1'
                };
                mijnAgendaItems.push(optreden);
            }

            //over performances loopen en info in AgendaItem steken
            //type en basic info
            for (var x= 0; x < agendaItems.performances.length; x++) {
                let optreden = {
                    _id: guid(),
                    name: agendaItems.performances[x].beschrijving,
                    startDateTime: new Date(agendaItems.performances[x].startDateTime),
                    endDateTime: new Date(agendaItems.performances[x].endDateTime),
                    type: 'Optreden',
                    classes: 'color-2'
                };
                mijnAgendaItems.push(optreden);
            }

            this.setState({items: mijnAgendaItems});

        });
    }



    handleCellSelection(item){
        console.log('handleCellSelection',item)
    }
    handleItemEdit(item){
        console.log('handleItemEdit', item)
    }
    handleRangeSelection(item){
        console.log('handleRangeSelection', item)
    }

    render() {

      return  (
          <div>
              <section className="container">
                  <div className="whiteBox">

                      <h1 className="header">Agenda</h1>
              <ReactAgenda
                  minDate={now}
                  maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
                  disablePrevButton={false}
                  startDate={this.state.startDate}
                  cellHeight={this.state.cellHeight}
                  locale={this.state.locale}

                  //TODO: vervangen door eigen items na AJAX call
                  items={this.state.items}


                  numberOfDays={this.state.numberOfDays}
                  rowsPerHour={this.state.rowsPerHour}
                  itemColors={colors}
                  autoScale={false}
                  fixedHeader={true}
                  onItemEdit={this.handleItemEdit.bind(this)}
                  onCellSelect={this.handleCellSelection.bind(this)}
                  onRangeSelection={this.handleRangeSelection.bind(this)}
                  itemComponent={AgendaItem}
              />
            </div>
              </section>
          </div>
        );
    }
}

export default Agenda;