import * as React from 'react';
//import { userlist } from "./Thunks/userlistThunk"
import { connect } from "react-redux"

interface StateInterface {

    allUsers: Array<{ _id: string, username: string, selected: boolean }>
    //selectedUsers: Array<{ _id: string, username: string }>
    searchTerm: string

}

interface PropsInterface {
    userlist: any,
    addAllContacts: any,
    users: Array<{ _id: string, username: string, selected: boolean }>

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


        //  let array_aux = this.state.allUsers.slice()
        // 1/5 REDUX REDUX REDUX REDUX :-)
        let array_aux = this.props.users.slice()
        array_aux[idx].selected = e.currentTarget.checked
        // this.setState({ allUsers: array_aux })
        // 2/5 REDUX REDUX REDUX REDUX :-)
        this.props.addAllContacts(array_aux)
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
                // this.setState({ allUsers })
                // 3/5 REDUX REDUX REDUX REDUX :-)
                this.props.addAllContacts(allUsers)
                console.log(this.state)
            }
        )

    }

    // to use the right context
    updateContacts = () => {

        console.log(this.state)


    }

    handleChat = (e: React.FormEvent<HTMLButtonElement>) => {

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
                                        {/* {(this.state.allUsers).map((d, idx) => { */}

                                        {/* 4/5 REDUX REDUX REDUX REDUX REDUX */}
                                        {(this.props.users).map((d: any, idx: any) => {

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
                {/* 5/5 REDUX REDUX REDUX REDUX REDUX */}
                {/* {(this.state.allUsers).map((d, idx) => { */}
                {/* {(this.props.users).map((d, idx) => {
                    if (d.selected) {
                        let li_value = "Contact: ".concat(d.username)
                        return (<button onClick={this.handleChat} className="btn btn-info" key={idx} id={d._id}>{li_value}</button>)
                    }
                    else
                        return
                })} */}


            </div>

        );
    }
}

// return (dispatch:Function) => {
//     return socket.emit("input", {name, message})
// }
import axios from "axios"

const mapDispatchToProps = (dispatch: Function) => {
    return {
        userlist: (searchTerm: string) => axios.post("/api/users/userlist/", { searchParam: searchTerm }),
        addAllContacts: (allUsers: Array<{ _id: string, username: string, selected: boolean }>) => dispatch({ type: "ADD_CONTACTS", payload: { allUsers } })
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.allUsersInState,
    };
};

// export function userlist(searchTerm:string) {
//     return (dispatch:Function) => {
//         return axios.post("/api/users/userlist/",{searchParam:searchTerm})
//     }

// const mapDispatchToProps = dispatch => {
//     return {
//         onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
//         onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
//         onAddCounter: () => dispatch({type: actionTypes.ADD, val: 10}),
//         onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 15}),
//         onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
//         onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
//     }
// };

export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(Right)