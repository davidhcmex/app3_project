import * as React from 'react';
import { connect } from "react-redux"

interface ClassState {
 
    contacts: Array<{ _id: string, user: string, contact: string, username:string, contactname:string }>
   
}


export class Left extends React.Component<connected_p,ClassState> {
    constructor(props: any) {
        super(props)
        this.state = {

            contacts: [],
          
            // selectedUsers: [{ _id: "", username: "" }],
        }
    }


    handleChat = (e: React.FormEvent<HTMLButtonElement>) => {

        console.log(e.currentTarget.id)

    }

    componentDidMount(){

        this.props.getAllContactsList(this.props.loggedUser).then(
            (response: any) => {
                this.setState({contacts:response.data})
            }
        )

    }


    render() {
        return (
            <div>
                {/* 1/1 REDUX REDUX REDUX REDUX REDUX */}
                {/* {(this.state.allUsers).map((d, idx) => { */}
                {(this.state.contacts).map((d, idx) => {
                   
                        let li_value = "UserID: ".concat(d.username, "ContactID", d.contactname)
                        return (<button onClick={this.handleChat} className="btn btn-info" key={idx} >{li_value}</button>)
                    
                    
                })}

            </div >
        );
    }
}

type m2p = {
    contacts:Array<{ _id: string, userId: string, contactId: string }>,
    loggedUser: string
}

type d2p = {
    getAllContactsList:(userIdTerm:string)=>(any)
}

type own_p = {

}

type connected_p = m2p & d2p & own_p

const mapStateToProps = (state: any) => {
    return {
        contacts: state.allContactsInState,
        loggedUser: state.idLoggedUser
    };
};

import axios from "axios"

const mapDispatchToProps = (dispatch: Function) => {
    return {
        
        getAllContactsList: (userIdTerm: string) => axios.post("/api/users/contactlist/", { userIdParam: userIdTerm }),
      //  displayAllContacts: (allUsers: Array<{ _id: string, username: string, selected: boolean }>) => dispatch({ type: "ADD_USERS", payload: { allUsers } })
    }
}

export default connect<m2p, d2p>(mapStateToProps,mapDispatchToProps)(Left)

