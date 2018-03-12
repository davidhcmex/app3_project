import * as React from 'react';
import {SignupForm} from "./SignupForm";
import { RouteComponentProps } from "react-router-dom";

//import {userSignupRequest} from "./Actions/signupActions"


export class Register extends React.Component<RouteComponentProps<{}>,{}> {
    render() {
 

        // userSignupRequest is not A FUNCTION.. IT IS UNDEFINED
        
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm history={this.props.history} />
                </div>
            </div >
        )
    }
}
