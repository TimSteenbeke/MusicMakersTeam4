/**
 * Created by jariv on 20/03/2018.
 */
import * as LesService from '../../Services/LesService'
import swal from "sweetalert2";
import Header from '../GeneralComponents/Header';
import './AddLesson.css';

export default class Lessons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
        };
    }

    componentDidMount() {
        this.getLessons();
    }

    getLessons() {
        LesService.getLessons().then(lessons => {
            this.setState({lessons: lessons});
        });
    }

    render() {

        return (

            <div className="Homepage">
                <Header name="Lessen"/>
                <section className="containerCss">
                    <table className="highlight striped black-text bordered responsive-table centered">
                        <thead>
                        <tr>
                            <th>CourseId</th>
                            <th>Beschrijving</th>
                            <th>Begindatum</th>
                            <th>Einddatum</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.lessons.map((les, index) => (
                            <tr key={index} id={les.instrumentId}>
                                <td>{instrument.instrumentname}</td>
                                <td>{instrument.type}</td>
                                <td>{instrument.uitvoering}</td>
                                <td>
                                    <Link className="waves-effect white-text deep-orange darken-4 btn marginator"
                                          to={`/instrumentdetails/${instrument.instrumentId}` }>
                                        <i className="material-icons">edit
                                        </i>
                                    </Link>
                                    <a className="waves-effect white-text deep-orange darken-4 btn"
                                       onClick={(e) => this.handleDelete(instrument.instrumentId, e)}><i
                                        className="material-icons">delete
                                    </i></a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="fixed-action-btn">
                        <Link to="/addInstrument" className="btn-floating btn-large deep-orange darken-4">
                            <i className="large material-icons">add</i>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}