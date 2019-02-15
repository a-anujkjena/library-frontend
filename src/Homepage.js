import React, { Component } from 'react';

class HomePage extends Component {
    constructor(props) {
        super(props);
        console.log("role",props);
        this.state = {
            role: props.role
        }
    }

    render() {
        return (
            <div >
                <span>"This is Home Page for " {this.state.role}</span>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default HomePage;