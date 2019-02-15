import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import HomePage from './Homepage';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginScreen:[],
      homeScreen:[]
    }
  }

  componentWillMount(){
    let isloginflag = localStorage.getItem('isLogin');
    if(isloginflag) {
      let role = localStorage.getItem('role');
      let roledata = null;
      if(role) {
        roledata=role;
      }
      var HomePageScreen = [];
      HomePageScreen.push(<HomePage appContext={this} role={roledata}/>);
      this.setState({
        homeScreen:HomePageScreen
      });
    } else {
      var loginscreen=[];
      loginscreen.push(<Login appContext={this}/>);
      this.setState({
        loginScreen:loginscreen
      });
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="loginscreen">
          {this.state.loginScreen}
          {this.state.homeScreen}
        </div>
      </div>
    );
  }
}

export default App;
