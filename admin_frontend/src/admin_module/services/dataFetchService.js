import {getAdminToken, hostname} from '../globalVariablesAndFunctions'

const itemURLs = {
    category: hostname + '/categories',
    author: hostname + '/authors',
    book: hostname + '/books',
    admin: hostname + '/admin'
}

const getList = (listName) => {
    return fetch(itemURLs[listName], {headers: {token: getAdminToken()}}).then((res) => res.json())
}

export {getList}