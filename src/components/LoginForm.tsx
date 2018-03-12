import * as React from "react";
//import axios from "axios"
import { connect } from "react-redux"
import { login } from "./Actions/authActions"
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as jwt from "jsonwebtoken";


//Here we will use redux to use  an action that will 
//perform the post method (in register we did not use it)

interface StateInterface {
    username: string,
    password: string,
    isValid: boolean,
    token:string

}

interface ErrorsInterface extends StateInterface {
    errors: Array<{ param: string, msg: string, value: string }>
}


class LoginForm extends React.Component<{ login: any, history: any }, ErrorsInterface> {

    //class LoginForm extends React.Component<RouteComponentProps<{id:string}>, ErrorsInterface> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errors: [{ param: "", msg: "", value: "" }],
            isValid: true,
            token:""


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
                    
                    const token = response.data.token;
                    localStorage.setItem("jwtToken", token)
                    setAuthorizationToken(token)
                    console.log(jwt.decode(token))
                    this.setState({errors: [{ param: "Ok", msg: ".. Redirecting to login page", value: "" }], isValid:false})
                    setTimeout(()=>this.props.history.push("/chat"),2000)
                    
                
                }



            }
        )

        //We will substitue this with an action (Although it is working quite fine )
        // axios.post("/api/users/login", this.state)
        //     .then((response) => {
        //         console.log(response)
        //         this.setState({
        //             errors: response.data.errors,
        //             isValid: response.data.isValid
        //         })
        //     });

        console.log(this.state)
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
                <h1>Chat User Login</h1>
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input value={this.state.username}
                        ref={node => this["uname"] = node}
                        type="text"
                        name="username"
                        onChange={this.onChange}
                        className="form-control" />

                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
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
                                let li_value = "Field: ".concat(d.param,  "Remark: ", d.msg)
                                return (<li key={idx}>{li_value}</li>)
                            })}

                        </ul>) : ""}
                </div>
            </form >
        )
    }
}



//dispatch to props as second parameter
export default connect<{}, {}, { history: any }>(null, { login })(LoginForm)





