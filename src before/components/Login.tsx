import * as React from "react";
import LoginForm from './LoginForm';
import { RouteComponentProps } from "react-router-dom";


export class Login extends React.Component<RouteComponentProps<{}>, {}> {
  render() {

    return (
      <div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <LoginForm history={this.props.history} />
          </div>
        </div>
        <a href="/register" className="btn btn-default" role="button">Not Registered yet ?</a>
      </div>

    );
  }
}

