import * as React from "react";
import LoginForm from './LoginForm';
import LangForm from './LangForm';
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux"
import { FormattedMessage } from 'react-intl';

interface d2p {
  setLang: (values: { lang: string }) => (any),
}



export class Login extends React.Component<RouteComponentProps<{}> & d2p, {}> {

  //export class Login extends React.Component<d2p, {}> {

  constructor(props: any) {
    super(props)

    this.showResults = this.showResults.bind(this)

  }

  showResults(values: any) {
    console.log(this.props.setLang)
    this.props.setLang(values)
  }

  render() {

    return (
      <div>
        <div>
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <LoginForm history={this.props.history} />
            </div>
          </div>
          <a href="/register" className="btn btn-default" role="button">
            <FormattedMessage
              id="loginForm.notRegisteredYet"
              defaultMessage="dashboard"
            />
          </a>
        </div>

        <div className="btn-group dropright">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <FormattedMessage
              id="loginForm.changeLanguage"
              defaultMessage="dashboard"
            />
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenu2" >
            <LangForm onSubmit={this.showResults} />
          </div>

        </div>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setLang: (values: { lang: string }) => dispatch({ type: "SET_LANG", payload: { values } }),
  }
}

export default connect<{}, d2p, {}>(null, mapDispatchToProps)(Login)

