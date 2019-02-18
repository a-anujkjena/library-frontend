import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: props.userdata,
            anchorEl: null,
        }
    }

    handleClick(event) {
        localStorage.setItem( 'isLogin', false );
        localStorage.removeItem('userdata');
        var loginscreen=[];
        loginscreen.push(<Login appContext={this.props.appContext}/>);
        this.props.appContext.setState({ loginScreen: loginscreen, homeScreen: [] });
    };

    render() {

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title={this.state.userdata.name}>
                        <div>
                            <RaisedButton label="Logout" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                        </div>
                    </AppBar>
                    <div >
                        <span>"This is Home Page for " {this.state.userdata.role}</span>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const style = {
    margin: 15,
};


export default HomePage;