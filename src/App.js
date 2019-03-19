import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import HomePage from './Homepage';
import { Provider } from 'react-redux'
import Store from './redux/store'

import AWS from 'aws-sdk'
import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import AWSConfig from './config/aws'

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Name',
      key: 'name',
      required: true,
      placeholder: 'Name',
      type: 'text',
      displayOrder: 1
    },
    {
      label: 'User Name',
      key: 'username',
      required: true,
      placeholder: 'Username',
      type: 'text',
      displayOrder: 2
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 3
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 4
    },
    {
      label: 'Role',
      key: 'custom:custom:role',
      required: true,
      placeholder: 'Role',
      type: 'text',
      displayOrder: 5
    }
  ]
};


Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: AWSConfig.cognito.REGION,
    identityPoolId: AWSConfig.cognito.IDENTITY_POOL_ID,
    userPoolId: AWSConfig.cognito.USER_POOL_ID,
    userPoolWebClientId: AWSConfig.cognito.APP_CLIENT_ID
  }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginScreen: [],
      homeScreen: [],
      status: null,
      error:null
    }
  }

  componentWillMount() {
    localStorage.setItem( 'isLogin', false );
    localStorage.removeItem('userdata');
    Auth.currentSession()
      .then(data => {
        let loginurl = 'cognito-idp.' + AWSConfig.cognito.REGION + '.amazonaws.com/' + AWSConfig.cognito.USER_POOL_ID
        // Add the User's Id Token to the Cognito credentials login map.
        AWS.config.region = AWSConfig.cognito.REGION;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: AWSConfig.cognito.IDENTITY_POOL_ID,
          Logins: {
            [loginurl]: data.getIdToken().getJwtToken()
          }
        });
        let temprole = "user";
        if(data.idToken.payload["custom:custom:role"] && (data.idToken.payload["custom:custom:role"] == "Admin" || data.idToken.payload["custom:custom:role"] == "admin")){
          temprole = "admin";
        }
        let userdata = {
          role: temprole,
          name: data.idToken.payload.name,
          id: data.idToken.payload.sub
        };
        localStorage.setItem( 'isLogin', true );
        localStorage.setItem( 'userdata', JSON.stringify(userdata) );
        this.state.status="Success"
        this.setingPage();
      })
      .catch(err => {
        console.log(err)
        this.state.status="Fail"
        this.setState({error:err});
      });
  }

  setingPage() {
    let isloginflag = localStorage.getItem('isLogin');
    if (isloginflag && isloginflag != 'false') {
      let userdata = JSON.parse(localStorage.getItem('userdata'));
      var HomePageScreen = [];
      HomePageScreen.push(<HomePage appContext={this} userdata={userdata} key="homepage" />);
      this.setState({
        homeScreen: HomePageScreen
      });
    } else {
      var loginscreen = [];
      loginscreen.push(<Login appContext={this} key="loginpage" />);
      this.setState({
        loginScreen: loginscreen
      });
    }
  }

  render() {
    let tempview = (
      <Provider store={Store}>
        <div className="App">
          <div className="loginscreen">
            <div>Loading....</div>
          </div>
        </div>
      </Provider>
    );
    if (this.state.status && this.state.status == "Success") {
      tempview = (
        <Provider store={Store}>
          <div className="App">
            <div className="loginscreen">
              {this.state.loginScreen}
              {this.state.homeScreen}
            </div>
          </div>
        </Provider>
      )
    } else if(this.state.status && this.state.status == "Fail") {
      tempview = (
        <Provider store={Store}>
          <div className="App">
            <div className="loginscreen">
              {this.state.error}
            </div>
          </div>
        </Provider>
      )
    }
    return tempview;
  }
}

let AppWrapper = withAuthenticator(App, {includeGreetings: true,signUpConfig})

export default AppWrapper;
