import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';

import _ from 'lodash';

import Login from './Login';

class HomePage extends Component {
    constructor(props) {
        super(props);
        let books = [
            {
                "id": 1,
                "Title": "Book Title One",
                "Author": "Author One",
                "Year": 2000,
                "IsIssued": "No",
                "Date_of_Issue": null,
                "Date_Of_Return": null,
                "Member_Id": null
            },
            {
                "id": 2,
                "Title": "Book Title Two",
                "Author": "Author Two",
                "Year": 2001,
                "IsIssued": "Yes",
                "Date_of_Issue": "2018-12-02",
                "Date_Of_Return": "2019-03-02",
                "Member_Id": 2
            },
            {
                "id": 3,
                "Title": "Book Title Three",
                "Author": "Author Three",
                "Year": 2005,
                "IsIssued": "Yes",
                "Date_of_Issue": "2018-12-21",
                "Date_Of_Return": "2019-03-15",
                "Member_Id": 2
            },
            {
                "id": 4,
                "Title": "Book Title Four",
                "Author": "Author Four",
                "Year": 2010,
                "IsIssued": "No",
                "Date_of_Issue": null,
                "Date_Of_Return": null,
                "Member_Id": null
            }
        ];
        let finalbookdata = books;
        let onebook = null;
        if (props.userdata.role && props.userdata.role == 'user') {
            if (props.userdata.id) {
                finalbookdata = _.filter(books, { 'Member_Id': props.userdata.id });
            }
        }

        this.state = {
            userdata: props.userdata,
            books: finalbookdata,
            onebook: onebook
        }
    }



    handleClick(event) {
        localStorage.setItem('isLogin', false);
        localStorage.removeItem('userdata');
        var loginscreen = [];
        loginscreen.push(<Login appContext={this.props.appContext} />);
        this.props.appContext.setState({ loginScreen: loginscreen, homeScreen: [] });
    };

    getValues(event) {
        console.log(event.target.id);
        console.log(event.target.value);
    }

    openEditPopup(event) {
        let index = _.findIndex(this.state.books, { "id": parseInt(event.target.id) });
        if (index > -1) {
            this.setState({ onebook: this.state.books[index] });
        }
        document.getElementById("b" + event.target.id).click();
    }

    openAddPopup(event) {

        this.setState({ onebook: null });
        document.getElementById("addbook").click();
    }

    render() {

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title={this.state.userdata.name}>
                        <div>
                            <RaisedButton label="Logout" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                        </div>
                    </AppBar>
                    <table className="table table-striped" style={style}>
                        <thead>
                            <tr>
                                <th style={tdstyle}>Title</th>
                                <th style={tdstyle}>Author</th>
                                <th style={tdstyle}>Year</th>
                                <th style={tdstyle}>Date of Issue</th>
                                <th style={tdstyle}>Date Of Return</th>
                                <th style={tdstyle}>Member Id</th>
                                <th style={tdstyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.books.map(row => (
                                <tr >
                                    <td>{row.Title}</td>
                                    <td >{row.Author}</td>
                                    <td >{row.Year}</td>
                                    <td >{row.Date_of_Issue}</td>
                                    <td >{row.Date_Of_Return}</td>
                                    <td >{row.Member_Id}</td>
                                    <td >
                                        {(this.state.userdata.role == 'admin') ? <div><a href="#"><span id={row.id} className="glyphicon glyphicon-edit" onClick={event => this.openEditPopup(event)}></span></a>&nbsp;&nbsp;<a href="#">
                                            <span className="glyphicon glyphicon-trash"></span>
                                        </a><RaisedButton style={btstyle} id={"b" + row.id} label="Edit" primary={true} data-toggle="modal" data-target="#myModal" /></div> : <div><button id={row.id} type="button" className="btn btn-info" >Return</button></div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(this.state.userdata.role == 'admin') ? <div><button id="addbook" style={btstyle} type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Add Book</button><RaisedButton label="Add New Book" primary={true} style={style} onClick={event => this.openAddPopup(event)} /></div> : null}
                    <div className="modal fade" id="myModal" role="dialog" style={mdstyle}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">{this.state.onebook ? "UPDATE BOOK" : "ADD BOOK"}</h4>
                                </div>
                                <div className="modal-body ">
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <span>Book Title: </span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <input type="text" value={this.state.onebook ? this.state.onebook.Title : ''} id="booktitle" className="form-control" onChange={event => this.getValues(event)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <span>Book Author: </span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <input type="text" value={this.state.onebook ? this.state.onebook.Author : ''} id="bookauthor" className="form-control" onChange={event => this.getValues(event)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <span>Book Year: </span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <input type="text" value={this.state.onebook ? this.state.onebook.Year : ''} id="bookyear" className="form-control" onChange={event => this.getValues(event)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <span>Assign To: </span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <select className="form-control" value={this.state.onebook ? (this.state.onebook.Member_Id ? this.state.onebook.Member_Id : '0') : '0'} id="assignto" onChange={event => this.getValues(event)}>
                                                        <option value='0'>Select Member</option>
                                                        <option value='1'>User 1</option>
                                                        <option value='2'>User 2</option>
                                                        <option value='3'>User 3</option>
                                                        <option value='4'>User 4</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <span>Issue Date: </span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <input type="date" value={this.state.onebook ? (this.state.onebook.Date_of_Issue ? this.state.onebook.Date_of_Issue : '') : ''} id="issuedate" className="form-control" onChange={event => this.getValues(event)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <span>Return Date: </span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <input type="date" value={this.state.onebook ? (this.state.onebook.Date_Of_Return ? this.state.onebook.Date_Of_Return : '') : ''} id="returndate" className="form-control" onChange={event => this.getValues(event)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div><RaisedButton label="Save" primary={true} style={style} /></div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const style = {
    margin: 15,
};

const mdstyle = {
    margin: 100,
};

const btstyle = {
    display: "none",
};

const tdstyle = {
    "textAlign": "center",
    "verticalAlign": "middle"
}


export default HomePage;