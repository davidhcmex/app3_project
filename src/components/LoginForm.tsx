import * as React from "react";
import axios from "axios"

interface StateInterface {
    username: string,
    password: string,
    isValid:boolean
    
}

interface ErrorsInterface extends StateInterface {
    errors: Array<{ param: string, msg: string, value: string }>
}



export default class LoginForm extends React.Component<{}, ErrorsInterface> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errors: [{ param: "", msg: "", value: "" }],
            isValid: true
           

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()

        axios.post("/api/users/login", this.state)
            .then((response) => {
                console.log(response)
                this.setState({
                    errors: response.data.errors,
                    isValid: response.data.isValid
                })
            });

        console.log(this.state)
    }

    onChange(e: React.FormEvent<EventTarget>) {

        this.setState(
            {
                username: this["uname"].value,
                password: this["passwd"].value,
                isValid:false

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
                        type="text" name="password"
                        ref={node => this["passwd"] = node}
                        onChange={this.onChange}
                        className="form-control" />

                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-md">
                        Login
                </button>
                    {! (this.state.isValid) ? (
                        <ul>
                            {(this.state.errors).map(function (d, idx) {
                                let li_value = "Field: ".concat(d.param, "Remark: ", d.msg)
                                return (<li key={idx}>{li_value}</li>)
                            })}

                        </ul>) : ""}
                </div>
            </form >
        )
    }
}



