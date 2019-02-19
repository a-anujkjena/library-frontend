import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import HomePage from './Homepage';

import userdata from '../data/user.json';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errormessage: '',
        }
    }

    handleClick(event) {
        var apiBaseUrl = "http://localhost:4000/api/";
        var self = this;
        var payload = {
            "email": this.state.username,
            "password": this.state.password
        }

        let logindata = userdata;

        if((payload.email && payload.password) && (payload.email != '' && payload.password != '')){
            let index = _.findIndex(logindata,{"email":payload.email,"password":payload.password});
            if(index == -1) {
                this.setState({errormessage: "Wrong Email Or Password"});
            } else {
                let userdata = {
                    role: logindata[index].role,
                    name: logindata[index].name,
                    id: logindata[index].id
                };
                var HomePageScreen = [];
                HomePageScreen.push(<HomePage appContext={self.props.appContext} userdata={userdata} key="homepage"/>);
                localStorage.setItem( 'isLogin', true );
                localStorage.setItem( 'userdata', JSON.stringify(userdata) );
                self.props.appContext.setState({ loginScreen: [], homeScreen: HomePageScreen });
            }
        } else {
            this.setState({errormessage: "Please give all required data"});
        }

        /*axios.post(apiBaseUrl + 'login', payload)
            .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    console.log("Login successfull");
                    var uploadScreen = [];
                    uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
                    self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
                }
                else if (response.data.code == 204) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });*/

    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <div style={errorstyle}>
                            {this.state.errormessage}
                        </div>
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
const errorstyle = {
    margin: 15,
    color: 'red'
};
export default Login;