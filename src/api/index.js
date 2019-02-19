import bookdata from '../../data/book.json';
import _ from 'lodash';

export function getBookData(user) {
    return new Promise(function (resolve, reject) {
        if(user.role) {
            if(user.role == "admin") {
                setTimeout(() => {
                    resolve(bookdata);
                }, 2000);
            } else {
                let finalbookdata = null;
                finalbookdata = _.filter(bookdata, { 'Member_Id': user.id });
                setTimeout(() => {
                    resolve(finalbookdata);
                }, 2000);
            }
        } else {
            reject("Record not found")
        }
    })
}