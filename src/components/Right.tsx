import * as React from 'react';
//import { userlist } from "./Thunks/userlistThunk"
import { connect } from "react-redux"

interface StateInterface {

    allUsers: Array<{ _id: string, username: string, selected: boolean }>
    //selectedUsers: Array<{ _id: string, username: string }>
    searchTerm: string

}

interface p {


    userId: string,
    username: string,
    users: Array<{ _id: string, username: string, selected: boolean }>,


}

interface d {
    userlist: any,
    addAllContactsToChoose: any,
    addContactDB: any,
    removeContactDB: any,
    unsetUserId: any,
    updateContactsUI: any,
    unsetContacts: any,
    unsetChatshistory: any,
    unsetRoomId:any,
    unsetfilterConversationId:any
}

interface owned {
    socket: SocketIOClient.Socket,
    history: any,
}

export class Right extends React.Component<p & d & owned, StateInterface>{

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

        if (e.currentTarget.checked) {
            if (confirm("You sure you want to add this contact from your list?")) {

                let array_aux = this.props.users.slice()
                array_aux[idx].selected = e.currentTarget.checked

                // add the contact, on response the contact should be added to the left contacts
                // list
                this.props.addContactDB(this.props.userId, this.props.username, array_aux[idx]._id, array_aux[idx].username )
                this.props.updateContactsUI(this.props.userId, this.props.username, array_aux[idx]._id, array_aux[idx].username)
                console.log("calling redux")
                
            }
        }
        else {
            if (confirm("You sure you want to delete this contact from your list?")) {
                //this.props.removeContactDB(userId, array_aux[idx]._id)
            }

        }
    }

    //on sumbit the modal form to search for contacts... (it is not the red close button)
    onSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()

        this.props.userlist(this.state.searchTerm).then(
            (response: any) => {
                //TIP using spread operator to finally add a field the response
                const allUsers = response.data.map((user: any) => {
                    return { ...user, selected: false }
                })
                // this.setState({ allUsers })
                // 3/4 REDUX REDUX REDUX REDUX :-)
                // pupulates the found users list
                this.props.addAllContactsToChoose(allUsers)

            }
        )

    }

    // to use the right context
    updateContacts = () => {

        console.log("pressed red button")


    }

    Logout = () => {

        if (confirm("You sure you want to logout?")) {
            console.log("disconnecting...")
            this.props.socket.disconnect()
            this.props.unsetUserId()
            this.props.unsetContacts()
            this.props.unsetChatshistory()
            this.props.unsetRoomId()
            this.props.history.push("/login")
            this.props.unsetfilterConversationId()
        }
    }



    render() {
        return (
            <div>
                <button className="btn btn-primary btn-md" data-toggle="modal" data-target="#myModal">
                    Manage List of Contacts
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
                                        className="form-control" required />
                                    <br />
                                    <button className="btn btn-primary btn-md">
                                        Search Contacts
                                        </button>

                                    <ul className="list-group">
                                        {/* {(this.state.allUsers).map((d, idx) => { */}

                                        {/* 4/4 REDUX REDUX REDUX REDUX REDUX */}
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
                <button className="btn btn-primary btn-md" onClick={this.Logout}>
                    Logout
                </button>



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
        addContactDB: (userId: string, userName:string, contactId: string, contactName:string) => axios.post("/api/users/addconversation/", { userId, userName, contactId, contactName })
            .then((response: any) => {
                if (response.data.ok == "ok") {
                    return ("success")
                }
                else {
                    return ("failure")
                }
            }),

        removeContactDB: (userId: string, contactId: string) => axios.post("/api/users/add/", { userId, contactId }),
        addAllContactsToChoose: (allUsers: Array<{ _id: string, username: string, selected: boolean }>) => dispatch({ type: "ADD_USERS", payload: { allUsers } }),
        unsetUserId: () => dispatch({ type: "UNSET_USER_ID" }),
        unsetContacts: () => dispatch({ type: "UNSET_CONTACTS" }),
        unsetChatshistory: () => dispatch({ type: "UNSET_CHATHISTORY" }),
        unsetRoomId: () => dispatch({ type: "UNSET_ROOMID" }),
        unsetfilterConversationId: () => ({type:"UNSETFILTER"}),
        updateContactsUI: (userId: string, usernamec: string, contactId: string, contactName: string) => dispatch({ type: "ADD_USERUID", payload: { userId, usernamec, contactId, contactName } })
    }
}

const mapStateToProps = (state: any) => {
    return {
        users: state.chatApp.allUsersInState,
        userId: state.chatApp.idLoggedUser,
        username: state.chatApp.nameLoggedUser
    };
};

export default connect<p, d, owned>(mapStateToProps, mapDispatchToProps)(Right)