import * as React from 'react';
//import * as openSocket from 'socket.io-client';
import { connect } from "react-redux"
//import handleSocket from "../modules/socketHandling"
//import { emit } from "./Thunks/emitThunk"

//import { emit } from "./Actions/emitActions"

interface stateInterface {

    message: string,
    status: string,
    uiUsername: string,
    the_messages: Array<{ name: string, message: string }>

}

interface PropsInterface {
    username: string,
}

interface p {
    socket: SocketIOClient.Socket
}

export class Chat extends React.Component<PropsInterface & p, stateInterface> {

    constructor(props: any) {
        super(props)
        this.state = {

            message: "",
            status: "",
            uiUsername: "",
            the_messages: [{ name: "", message: "" }],

        }


        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)



    }




    onChange(e: React.FormEvent<EventTarget>) {

        this.setState(
            {

                message: this["message"].value



            })
    }

    componentDidMount() {

        //receiving data to be output to local component render
        this.props.socket.on('output', (data: any) => this.display_screen(data));
    }

    display_screen(data: any) {
        let third_array = []

        third_array = (this.state.the_messages).concat(data)
        this.setState({ the_messages: third_array })
    }

    onSubmit(e: React.FormEvent<EventTarget>) {

        e.preventDefault()

        //  var socket = openSocket('http://127.0.0.1:4000');


        this.props.socket.on("status", (data: any) => {
            this.setState({ status: data.status })

        })




        this.props.socket.emit("input", { name: this.props.username, message: this["message"].value })

        // OR

        // REDUX

        //this.props.emit(this["uname"].value, this["message"].value)

    }

    render() {
        return (
            <div className="container">
                <div id="accordion">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    All contacts
                                </button>
                            </h5>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3 col-sm-12">
                                        <div id="status">{this.state.status}</div>
                                        <form onSubmit={this.onSubmit}>

                                            <div className="form-group">
                                                <label className="control-label">Logged User:</label>
                                                <p><strong> {this.props.username} </strong ></p>


                                            </div>
                                            <div id="chat">
                                                <div className="form-group">
                                                    <label className="control-label">Message</label>
                                                    <input value={this.state.message}
                                                        type="text" name="Message"
                                                        ref={node => this["message"] = node}
                                                        onChange={this.onChange}
                                                        className="form-control" />

                                                </div>
                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-md">
                                                        Submit
                                                    </button>
                                                    <br />
                                                </div>
                                                <label className="control-label">Messages Flow</label>
                                                <div className="card">

                                                    <div id="messages" className="card-block" style={{ height: "300px" }}>
                                                        {this.state.the_messages.map(function (d, idx) {
                                                            return (<p key={idx}>{d.name}{d.message}</p>)
                                                        })}
                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Collapsible Group Item #2
                                </button>
                            </h5>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Collapsible Group Item #3
                                </button>
                            </h5>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                            <div className="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                        </div>
                    </div>
                </div>


            </div >

        );
    }
}

const mapStateToProps = (state: any) => {
    return {

        userId: state.idLoggedUser,
        username: state.nameLoggedUser
    };
};
export default connect<PropsInterface, {}, { socket: SocketIOClient.Socket }>(mapStateToProps, {})(Chat)
//export default connect(null, mapDispatchToProps)(Chat)