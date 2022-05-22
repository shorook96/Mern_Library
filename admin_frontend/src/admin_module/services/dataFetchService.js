import {hostname} from '../globalVariablesAndFunctions'

const itemURLs = {
    category: hostname + '/categories',
    author: hostname + '/authors',
    book: hostname + '/books'
}

const getList = (listName) => {
    return fetch(itemURLs[listName]).then((res) => res.json())
}

export {getList}