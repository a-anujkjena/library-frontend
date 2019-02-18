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
    console.log("data",isloginflag)
    if(isloginflag && isloginflag != 'false') {
      let userdata = JSON.parse(localStorage.getItem('userdata'));
      console.log('userdata',userdata);
      var HomePageScreen = [];
      HomePageScreen.push(<HomePage appContext={this} userdata={userdata}/>);
      this.setState({
        homeScreen:HomePageScreen
      });
    } else {
      console.log("hello")
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
