import * as React from 'react';
import * as openSocket from 'socket.io-client';
import { connect } from "react-redux"

//import { emit } from "./Actions/emitActions"

interface stateInterface {
    name: string,
    message: string,
    status: string,
    the_messages: Array<{ name: string, message: string }>

}

interface propsInterface {
    onEmit:any
}

export class Chat extends React.Component<propsInterface, stateInterface> {

    constructor(props: any) {
        super(props)
        this.state = {
            name: "",
            message: "",
            status: "",
            the_messages: [{ name: "", message: "" }],

        }


        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)



    }


    onChange(e: React.FormEvent<EventTarget>) {

        this.setState(
            {
                name: this["uname"].value,
                message: this["message"].value,



            })
    }

    componentDidMount() {
        var socket = openSocket('http://127.0.0.1:4000');


        //receiving data to be output to local component render
        socket.on('output', (data: any) => this.display_screen(data));
    }

    display_screen(data: any) {
        let third_array = []

        third_array = (this.state.the_messages).concat(data)
        this.setState({ the_messages: third_array })
    }

    onSubmit(e:React.FormEvent<EventTarget>) {

        e.preventDefault()
        console.log(arguments)
        var socket = openSocket('http://127.0.0.1:4000');

        //ASK IVAN AND ALSO NEXT
        socket.on("status", (data:any) => {
            this.setState({ status: data.status })

        })
        // emitting to server and others the incoming message
        //socket.emit("input", { name: this["uname"].value, message: this["message"].value })

        // OR

        // REDUX

        this.props.onEmit(this["uname"].value, this["message"].value)

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-12">
                        <div id="status">{this.state.status}</div>
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <label className="control-label">Username</label>
                                <input value={this.state.name}
                                    ref={node => this["uname"] = node}
                                    type="text"
                                    name="Enter name"
                                    onChange={this.onChange}
                                    className="form-control" />

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

            </div >

        );
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onEmit: (name:any, message:any) => dispatch({ type: 'EMIT_INPUT', payload: { name, message } })
    };
};

export default connect<{}, {}, {}>(null, mapDispatchToProps)(Chat)
//export default connect(null, mapDispatchToProps)(Chat)