import * as React from "react";

export class SignupForm extends React.Component {
    render() {
        return(
        <form>
            <h1>Join Our Community</h1>
            <div className="form-group">
                <label className="control-label">Username</label>
                <input type="text" name="username" className="form-control" />

            </div>
            <div className="form-group">
                <button className="btn btn-primary btn-lg">
                    Signup
                </button>
            </div>
        </form>
        )
    }
}
