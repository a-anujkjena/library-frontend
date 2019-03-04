import bookdata from '../../data/book.json';
import _ from 'lodash';
import axios from 'axios';

var apiBaseUrl = "http://localhost:8986/v1/";


export function getBookData(user) {
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