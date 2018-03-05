import * as React from 'react';
import {SignupForm} from "./SignupForm";

export class Register extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm />
                </div>
            </div >
        )
    }
}