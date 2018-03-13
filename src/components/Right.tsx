import * as React from 'react';
import { userlist } from "./Thunks/userlistThunk"
import { connect } from "react-redux"

interface StateInterface {

    allUsers: Array<{ _id: string, username: string, selected: boolean }>
    //selectedUsers: Array<{ _id: string, username: string }>
    searchTerm: string

}

interface PropsInterface {
    userlist: any

}

export class Right extends React.Component<PropsInterface, StateInterface>{

    constructor(props: any) {
        super(props)
        this.state = {

            allUsers: [],
            searchTerm: "",
            // selectedUsers: [{ _id: "", username: "" }],
        }
        // this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeSearch = this.onChangeSearch.bind(this)
    }

    onChangeSearch(e: React.FormEvent<HTMLInputElement>) {
       
        this.setState(
            {
                searchTerm: e.currentTarget.value,
            })
    }

    //this is currying that accepts a casted idx and returns a function
    onChange = (idx: number) => (e: React.FormEvent<HTMLInputElement>) => {

        //Using an auxiliary array to finally set the state to reflect the checked users
        let array_aux = this.state.allUsers.slice()
        array_aux[idx].selected = e.currentTarget.checked
        this.setState({ allUsers: array_aux })
        console.log(this.state.allUsers)
    }

    onSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()

        this.props.userlist(this.state.searchTerm).then(
            (response: any) => {
                //TIP using spread operator to finally add a field the response
                const allUsers = response.data.map((user: any) => {
                    return { ...user, selected: false }
                })
                this.setState({ allUsers })
            }
        )

    }

    // to use the right context
    updateContacts = () => {

        console.log(this.state)


    }

    handleChat = (e:React.FormEvent<HTMLButtonElement>) => {

        console.log(e.currentTarget.id)

    }


    render() {
        return (
            <div>
                <button className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">
                    Update List of Contacts
                </button>
                <div className="modal fade" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Contacts Registered</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmit}>



                                    <label className="control-label">Enter Search Term for Contacts</label>
                                    <input value={this.state.searchTerm}
                                        type="text"
                                        name="Enter name"
                                        onChange={this.onChangeSearch}
                                        className="form-control" />
                                    <br />
                                    <button className="btn btn-primary btn-md">
                                        Search Contacts
                                        </button>

                                    <ul className="list-group">
                                        {(this.state.allUsers).map((d, idx) => {

                                            return (<li key={idx} className="list-group-item"><input type="checkbox" onChange={this.onChange(idx)} id={d._id} />{d.username}</li>)
                                        })}

                                    </ul>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button onClick={this.updateContacts} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                    {(this.state.allUsers).map( (d, idx) => {
                        if (d.selected) {
                            let li_value = "Contact: ".concat(d.username)
                            return (<button onClick = {this.handleChat} className="btn btn-info" key={idx} id={d._id}>{li_value}</button>)
                        }
                        else
                            return
                    })}

                
            </div>

        );
    }
}


export default connect<{}, {}, {}>(null, { userlist })(Right)