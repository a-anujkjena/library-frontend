
import _ from 'lodash';
import axios from 'axios';
import gql from 'graphql-tag'
import Client from 'aws-appsync'
import { Auth } from 'aws-amplify'

import GraphqlAPI from '../graphql'
import AWSConfig from '../config/aws'

const client = new Client({
    url: AWSConfig.awsmobile.aws_appsync_graphqlEndpoint,
    region: AWSConfig.awsmobile.aws_appsync_region,
    auth: {
        type: AWSConfig.awsmobile.aws_appsync_authenticationType,
        jwtToken: async () => (await Auth.currentSession()).idToken.jwtToken,
        apiKey: AWSConfig.awsmobile.aws_appsync_apiKey
    },
    disableOffline: true
})

var apiBaseUrl = "http://localhost:8986/v1/";


/*export function getBookData(user) {
    return new Promise(function (resolve, reject) {
        axios.get(apiBaseUrl + 'booklist?id='+user.id)
            .then(function (response) {
                if (response.status == 200) {
                    resolve(response.data.data);
                } else {
                    reject("something went wrong")
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
}*/

export function getUsersList(user) {
    return new Promise(function (resolve, reject) {
        axios.get(apiBaseUrl + 'awsUserlist')
            .then(function (response) {
                if (response.status == 200) {
                    resolve(response.data.data);
                } else {
                    reject("something went wrong")
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

export function getBookData(user) {
    if(user.role && user.role == 'admin') {
        return new Promise(function (resolve, reject) {
            client.query({
                query: gql(GraphqlAPI.listBooks),
                // variables: {
    
                // },
                fetchPolicy: 'network-only'
            }).then((data) => {
                console.log("word data --- ", data);
               
                resolve(data.data.listBooks.items)
            }).catch((err) => {
                console.log("Error --- ", err);
                reject(err);
            })
        });
    } else {
        return new Promise(function (resolve, reject) {
            client.query({
                query: gql(GraphqlAPI.listBooksUsingId),
                variables: {
                    filterData : {
                        Member_Id : {
                            eq : user.id
                        }
                    }
                },
                fetchPolicy: 'network-only'
            }).then((data) => {
                console.log("word data --- ", data);
               
                resolve(data.data.listBooks.items)
            }).catch((err) => {
                console.log("Error --- ", err);
                reject(err);
            })
        });
    }
}

/*export function returnBook(id) {
    return new Promise(function (resolve, reject) {
        axios.get(apiBaseUrl + 'returnbook?id='+id)
            .then(function (response) {
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    reject("something went wrong")
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
}*/

export function returnBook(iid) {
    return new Promise(function (resolve, reject) {
        let bookdata = {
            id: iid,
            Member_Id: null,
            Date_Of_Return: null,
            Date_of_Issue: null
        }
        client.mutate({
            mutation: gql(GraphqlAPI.updateBook),
            variables: {
                updatebookinput : bookdata
            }
            //fetchPolicy: 'network-only'
        }).then((data) => {
            console.log("word data --- ", data);
            let redata = {
                status_code : 1
            }
            resolve(redata)
        }).catch((err) => {
            console.log("Error --- ", err);
            reject(err);
        })
    });
}

/*export function bookCrud(bookdata) {
    return new Promise(function (resolve, reject) {
        axios.post(apiBaseUrl + 'bookcrud',bookdata)
            .then(function (response) {
                if (response.status == 200) {
                    resolve(response.data);
                } else {
                    reject("something went wrong")
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
}*/

export function bookCrud(bookdata) {
    return new Promise(function (resolve, reject) {
        if(bookdata.action == "insert") {
            delete bookdata.action;
            client.mutate({
                mutation: gql(GraphqlAPI.addBook),
                variables: {
                    createbookinput : bookdata
                }
                //fetchPolicy: 'network-only'
            }).then((data) => {
                console.log("word data --- ", data);
                let redata = {
                    status_code : 1
                }
                resolve(redata)
            }).catch((err) => {
                console.log("Error --- ", err);
                reject(err);
            })
        } else if(bookdata.action == "update") {
            delete bookdata.action;
            delete bookdata.__typename;
            client.mutate({
                mutation: gql(GraphqlAPI.updateBook),
                variables: {
                    updatebookinput : bookdata
                }
                //fetchPolicy: 'network-only'
            }).then((data) => {
                console.log("word data --- ", data);
                let redata = {
                    status_code : 1
                }
                resolve(redata)
            }).catch((err) => {
                console.log("Error --- ", err);
                reject(err);
            })
        } else {
            delete bookdata.action;
            delete bookdata.__typename;
            client.mutate({
                mutation: gql(GraphqlAPI.deleteBook),
                variables: {
                    deletebookinput : bookdata
                }
                //fetchPolicy: 'network-only'
            }).then((data) => {
                console.log("word data --- ", data);
                let redata = {
                    status_code : 1
                }
                resolve(redata)
            }).catch((err) => {
                console.log("Error --- ", err);
                reject(err);
            })
        }
    });
}

export function loginUser(userdata) {
    return new Promise(function (resolve, reject) {
        var payload = {
            "emailid": userdata.email,
            "password": userdata.password
        }
        axios.post(apiBaseUrl + 'login', payload)
            .then(function (response) {
                if (response.status == 200) {
                    resolve(response.data.data);
                } else {
                    reject("something went wrong")
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
}