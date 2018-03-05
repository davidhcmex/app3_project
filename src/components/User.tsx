import * as React from "react";
import { RouteComponentProps } from "react-router-dom";


type State = {};

// User is called with an Id by Root
export class User extends React.Component <RouteComponentProps<{id:string}>, State>{
    onNavigateHome() {
 
        this.props.history.push("/home");
    }

    render() {
        return (
            <div>
                <h3>The User Page</h3>
                <p>User ID: {this.props.match.params.id}</p>
                <button onClick={this.onNavigateHome.bind(this)} className="btn btn-primary">Go Home!</button>
            </div>
        );
    }
}