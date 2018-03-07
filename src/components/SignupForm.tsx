import * as React from "react";
import axios from "axios"

interface user_info {
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

interface ErrorsInterface extends user_info {
    errors: Array<{ param: string, msg: string, value: string }>
}


export class SignupForm extends React.Component<{userSignupRequest:any}, ErrorsInterface> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            errors: [{ param: "", msg: "", value: "" }]
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        axios.post("/api/users", this.state)
            .then((response) => {
                console.log(response)
                this.setState({
                    errors: response.data.errors
                })
            });
        // console.log(this.props)  UNDEFINED
        //Hay que continuar AVANZANDO... esto de ligar con Redux QUEDA PENDIENTE,
        // VER REGISTER.TSX
          //  this.props.userSignupRequest(this.state)
            // this.props.userSignupRequest(this.state).then(
            //     () => {
            //       console.log("success")
            //     },
            //     (err:any) => this.setState({ errors: err.response.data.errors })
            //   );
        console.log(this.state)
    }

    onChange(e: React.FormEvent<EventTarget>) {

        this.setState(
            {
                username: this["uname"].value,
                email: this["email"].value,
                password: this["passwd"].value,
                passwordConfirmation: this["passwdCnf"].value,

            })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Chat User Registration</h1>
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
                    <label className="control-label">Email</label>
                    <input value={this.state.email}
                        type="text" name="email"
                        ref={node => this["email"] = node}
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
                    <label className="control-label">Confirm Password</label>
                    <input value={this.state.passwordConfirmation}
                        type="password" name="passwordConfirmation"
                        ref={node => this["passwdCnf"] = node}
                        onChange={this.onChange}
                        className="form-control" />

                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-md">
                        Signup
                </button>
                    {(this.state.errors[0].param != "") ? (
                        <ul>
                            {(this.state.errors).map(function (d, idx) {
                                let li_value = "Field: ".concat(d.param, "Remark: ", d.msg)
                                return (<li key={idx}>{li_value}</li>)
                            })}

                        </ul>) : ""}
                </div>
            </form>
        )
    }
}


