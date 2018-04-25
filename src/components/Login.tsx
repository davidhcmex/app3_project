import * as React from "react";
import LoginForm from './LoginForm';
import LangForm from './LangForm';
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux"
import { FormattedMessage } from 'react-intl';
import * as actions from '../reducers/actions';

interface d2p {
  setLang: (lang: string ) => (any),
}



export class Login extends React.Component<RouteComponentProps<{}> & d2p & s2p, {}> {

  //export class Login extends React.Component<d2p, {}> {

  constructor(props: any) {
    super(props)

    this.showResults = this.showResults.bind(this)

  }

  showResults(values: any) {
    console.log("gere in lang");
    
    console.log(values.lang)
    this.props.setLang(values.lang)
  }

  render() {

    return (
      <div>
        <div>
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <LoginForm />
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
            <LangForm onSubmit={this.showResults}  />
          </div>

        </div>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    //setLang: (values: { lang: string }) => dispatch({ type: "SET_LANG", payload: { values } }),
    setLang: (lang: string ) => dispatch(actions.setLang( lang ) ),
  }
}

const mapStateToProps = (state: any) => {
  return {
    getLang: state.chatApp.lang
  }
}

interface s2p {
  getLang: string
}


export default connect<s2p, d2p, {}>(mapStateToProps, mapDispatchToProps)(Login)

