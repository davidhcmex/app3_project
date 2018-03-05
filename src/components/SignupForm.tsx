import * as React from "react";

interface user_info {
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

export class SignupForm extends React.Component<{}, user_info> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
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
                <h1>Join Our Community</h1>
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
                </div>
            </form>
        )
    }
}
