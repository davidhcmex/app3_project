import * as React from 'react';

interface StateInterface {
    username: string,
}

export class Right extends React.Component <{},StateInterface>{

    constructor(props: any) {
        super(props)
        this.state = {
            username: "",
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e: React.FormEvent<EventTarget>) {

        this.setState(
            {
                username: this["uname"].value,
             
            })
    }

    onSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
       // this.props.findContacts(this.state).then
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">
                Contacts Search
                </button>
                <div className="modal fade" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Contacts Search</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmit}>
                           
                                    <div className="form-group">
                                        <label className="control-label">Username</label>
                                        <input value={this.state.username}
                                            ref={node => this["uname"] = node}
                                            type="text"
                                            name="username"
                                            onChange={this.onChange}
                                            className="form-control" />

                                    </div>
                                    <button className="btn btn-primary btn-md">
                                        Search
                </button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}


export default Right