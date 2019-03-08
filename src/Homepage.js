import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import { Creators } from './redux/actions'

import _ from 'lodash';

import Login from './Login';
import { ActionPermDeviceInformation } from 'material-ui/svg-icons';

//import usersdata from '../data/user.json';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: props.userdata,
            books: [],
            onebook: null,
            title: null,
            users: [
                {
                    id:1,
                    name:"Admin"
                },
                {
                    id:2,
                    name:"User"
                }
            ],
            testSagaStatus: this.props.testSagaStatus,
            apiResult: {},
            action: null,
            operation: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.action && this.state.action == 'return') {
            if(nextProps.apiResult && nextProps.apiResult.status_code && nextProps.apiResult.status_code == 1) {
                this.state.action=null;
                this.props.dispatch(Creators.testSagaRequest(this.state.userdata));
                alert('Book Return Successfully');
            } else {
                alert('Something Went Worng');
            }
        } else if(this.state.action && this.state.action == 'bookrud'){
            if(nextProps.apiResult && nextProps.apiResult.status_code && nextProps.apiResult.status_code == 1) {
                this.state.action=null;
                document.getElementById("closepopup").click();
                this.props.dispatch(Creators.testSagaRequest(this.state.userdata));
                alert('Operation Done Successfully');
            } else {
                alert('Something Went Worng');
            }
        } else {
            this.setState({
                books: JSON.parse(JSON.stringify(nextProps.bookData))
            })
        }
    }

    componentWillMount() {
        this.props.dispatch(Creators.testSagaRequest(this.state.userdata));
    }



    handleClick(event) {
        localStorage.setItem('isLogin', false);
        localStorage.removeItem('userdata');
        var loginscreen = [];
        loginscreen.push(<Login appContext={this.props.appContext} key="loginpage" />);
        this.props.dispatch(Creators.testSagaSuccess([]));
        this.props.appContext.setState({ loginScreen: loginscreen, homeScreen: [] });
    };

    returnBook(event) {
        this.state.action="return";
        this.props.dispatch(Creators.testReturnBook(event.target.id));
    }

    getValues(event) {
        let bookstate = {};
        if (this.state.onebook) {
            bookstate = JSON.parse(JSON.stringify(this.state.onebook));
        }
        switch (event.target.id) {
            case 'booktitle':
                bookstate.Title = event.target.value;
                this.setState({ onebook: bookstate });
                break;
            case 'bookauthor':
                bookstate.Author = event.target.value;
                this.setState({ onebook: bookstate });
                break;
            case 'bookyear':
                bookstate.Year = event.target.value;
                this.setState({ onebook: bookstate });
                break;
            case 'assignto':
                bookstate.Member_Id = event.target.value;
                this.setState({ onebook: bookstate });
                break;
            case 'issuedate':
                bookstate.Date_of_Issue = event.target.value;
                this.setState({ onebook: bookstate });
                break;
            case 'returndate':
                bookstate.Date_Of_Return = event.target.value;
                this.setState({ onebook: bookstate });
                break;
        }
    }

    openEditPopup(event) {
        let index = _.findIndex(this.state.books, { "id": parseInt(event.target.id) });
        if (index > -1) {
            let tempobj = JSON.parse(JSON.stringify(this.state.books[index]));
            if(this.state.books[index].Date_of_Issue) {
                let tempdate = tempobj.Date_of_Issue.split("T");
                tempobj.Date_of_Issue = tempdate[0];
            }
            if(this.state.books[index].Date_Of_Return) {
                let tempdate = tempobj.Date_Of_Return.split("T");
                tempobj.Date_Of_Return = tempdate[0];
            }
            this.setState({ onebook: tempobj });
        }
        this.state.operation="update"
        document.getElementById("b" + event.target.id).click();
    }

    openAddPopup(event) {
        this.state.operation="insert"
        this.setState({ onebook: null });
        document.getElementById("addbook").click();
    }

    saveChanges(event) {
        this.state.action="bookrud";
        if( this.state.onebook) {
            this.state.onebook.action = this.state.operation;
        } else {
            this.state.onebook = {};
            this.state.onebook.action = this.state.operation
        }
        
        this.props.dispatch(Creators.testBookCrud(this.state.onebook));
    }

    deleteBook(event) {
        this.state.action="bookrud";
        let tempid = event.target.id.split("_");
        let data = {
            action: "delete",
            id: tempid[1]
        }
        this.props.dispatch(Creators.testBookCrud(data));
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
                                <tr key={"rowdata" + row.id}>
                                    <td>{row.Title}</td>
                                    <td >{row.Author}</td>
                                    <td >{row.Year}</td>
                                    <td >{row.Date_of_Issue}</td>
                                    <td >{row.Date_Of_Return}</td>
                                    <td >{row.Member_Id}</td>
                                    <td >
                                        {(this.state.userdata.role == 'admin') ? <div><a href="#"><span id={row.id} className="glyphicon glyphicon-edit" onClick={event => this.openEditPopup(event)}></span></a>&nbsp;&nbsp;<a href="#">
                                            <span id={"d_"+row.id} className="glyphicon glyphicon-trash" onClick={event => this.deleteBook(event)}></span>
                                        </a><RaisedButton style={btstyle} id={"b" + row.id} label="Edit" primary={true} data-toggle="modal" data-target="#myModal" /></div> : <div><button id={row.id} type="button" className="btn btn-info" onClick={(event) => this.returnBook(event)} >Return</button></div>}
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
                                    <button type="button" id="closepopup" className="close" data-dismiss="modal">&times;</button>
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
                                                    <input type="text" value={this.state.onebook ? (this.state.onebook.Title ? this.state.onebook.Title : '') : ''} id="booktitle" className="form-control" onChange={event => this.getValues(event)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <span>Book Author: </span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <input type="text" value={this.state.onebook ? (this.state.onebook.Author ? this.state.onebook.Author : '') : ''} id="bookauthor" className="form-control" onChange={event => this.getValues(event)} />
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
                                                    <input type="text" value={this.state.onebook ? (this.state.onebook.Year ? this.state.onebook.Year : '') : ''} id="bookyear" className="form-control" onChange={event => this.getValues(event)} />
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
                                                        {this.state.users.map(optiondata => (
                                                            <option value={optiondata.id} key={optiondata.id}>{optiondata.name}</option>
                                                        ))}
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
                                    <div><RaisedButton label="Save" primary={true} style={style} onClick={event => this.saveChanges(event)} /></div>
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

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

function mapStateToProps(state) {
    return {
        bookData: state.global.bookData,
        testSagaStatus: state.global.status.TEST_SAGA,
        apiResult: state.global.apiResult
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


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);