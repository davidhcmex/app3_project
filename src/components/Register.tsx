import * as React from 'react';
import {SignupForm} from "./SignupForm";
import {userSignupRequest} from "./Actions/signupActions"
import {connect} from "react-redux"

export class Register extends React.Component<{userSignupRequest:any},{}> {
    render() {
 

        // userSignupRequest is not A FUNCTION.. IT IS UNDEFINED
        const {userSignupRequest} = this.props
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm userSignupRequest={userSignupRequest} />
                </div>
            </div >
        )
    }
}
export default connect((state) => {return{}}, { userSignupRequest })(Register);