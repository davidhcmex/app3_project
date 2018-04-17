import * as React from "react";
//import axios from "axios"
import { connect } from "react-redux"
//import { login } from "./Thunks/authThunk"
//import setAuthorizationToken from '../utils/setAuthorizationToken';
//import * as jwt from "jsonwebtoken";
import axios from "axios";

import { FormattedMessage } from 'react-intl';


//Here we will use redux to use  an action that will 
//perform the post method (in register we did not use it)

interface StateInterface {
    username: string,
    password: string,
    isValid: boolean,
    token: string

}

interface ErrorsInterface extends StateInterface {
    errors: Array<{ param: string, msg: string, value: string }>
}


class LoginForm extends React.Component<d2p & { login: any, history: any, setUserId: any }, ErrorsInterface> {

    //class LoginForm extends React.Component<RouteComponentProps<{id:string}>, ErrorsInterface> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errors: [{ param: "", msg: "", value: "" }],
            isValid: true,
            token: ""


        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        this.props.login(this.state).then(

            (response: any) => {


                if (response.data.errors)
                    this.setState({
                        errors: response.data.errors,
                        isValid: false
                    })
                else {
                    // console.log(response.data.token)
                    // this.setState({
                    //     token: response.data.token,
                    //     isValid: true
                    // })

                    // const token = response.data.token;
                    // localStorage.setItem("jwtToken", token)
                    // setAuthorizationToken(token)
                    // console.log(jwt.decode(token))


                    // REDUX REDUX REDUX REDUX
                    console.log(response.data.username)
                    this.props.setUserId(response.data.id, response.data.username)

                    // DAVID Apr-2  this is needed to add a chat window to those already existent
                    this.props.setChatsNumber()

                    this.setState({ errors: [{ param: "Ok", msg: ".. Redirecting to login page", value: "" }], isValid: false })
                    setTimeout(() => this.props.history.push("/chat"), 2000)


                }



            }
        )


    }

    onChange(e: React.FormEvent<EventTarget>) {

        this.setState(
            {
                username: this["uname"].value,
                password: this["passwd"].value,


            })
    }



    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>
                    <FormattedMessage
                        id="loginForm.chatUserLogin"
                        defaultMessage="dashboard"
                    />
                </h1>
                <div className="form-group">
                    <label className="control-label">
                        <FormattedMessage
                            id="loginForm.username"
                            defaultMessage="dashboard"
                        />
                    </label>
                    <input value={this.state.username}
                        ref={node => this["uname"] = node}
                        type="text"
                        name="username"
                        onChange={this.onChange}
                        className="form-control" />

                </div>

                <div className="form-group">
                    <label className="control-label">
                        <FormattedMessage
                            id="loginForm.password"
                            defaultMessage="dashboard"
                        />
                    </label>
                    <input value={this.state.password}
                        type="password" name="password"
                        ref={node => this["passwd"] = node}
                        onChange={this.onChange}
                        className="form-control" />

                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-md">
                        Login
                </button>
                    {!(this.state.isValid) ? (
                        <ul>
                            {(this.state.errors).map(function (d, idx) {
                              
                                return (<li key={idx}>Field: &nbsp;{d.param}&nbsp;&nbsp;&nbsp; Remark:&nbsp;{d.msg}</li>)
                            })}

                        </ul>) : ""}
                </div>
            </form >
        )
    }
}
interface d2p {
    setChatsNumber: () => (any)
}


const mapDispatchToProps = (dispatch: Function) => {
    return {
        login: (data: { username: string, password: string }) => axios.post("/api/users/login/", { username: data.username, password: data.password }),
        setUserId: (id: string, username: string) => dispatch({ type: "SET_USER_ID", payload: { username, id } }),
        setChatsNumber: () => dispatch({ type: "SET_CHATNUMBER" })
    }
}


//addAllContacts: (allUsers: Array<{ _id: string, username: string, selected: boolean }>) => dispatch({ type: "ADD_CONTACTS", payload: { allUsers } })

export default connect<{}, d2p, { history: any }>(null, mapDispatchToProps)(LoginForm)





