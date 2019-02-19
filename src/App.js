import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import HomePage from './Homepage';
import { Provider } from 'react-redux'
import Store from './redux/store'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginScreen: [],
      homeScreen: []
    }
  }

  componentWillMount() {
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
    return (
      <Provider store={Store}>
        <div className="App">
          <div className="loginscreen">
            {this.state.loginScreen}
            {this.state.homeScreen}
          </div>
        </div>
      </Provider>

    );
  }
}

export default App;
