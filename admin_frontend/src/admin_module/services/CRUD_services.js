import {getAdminToken, hostname} from '../globalVariablesAndFunctions'; 
import axios from 'axios';

const createCategory = async (category) => {
    const res = await axios({
        method: 'post',
        url: hostname + '/categories/',
        responseType: 'json',
        data: category,
        headers: {
            token: getAdminToken()
        }
    });

    return res;
}


const deleteCategory = async (itemID) => {
    const res = await axios({
        method: 'delete',
        url: hostname + '/categories/' + itemID,
        responseType: 'json',
        headers: {
            token: getAdminToken()
        }
    });

    return res;
}

const updateCategory = async (itemID, newCategoryData) => {
    const res = await axios({
        method: 'patch',
        url: hostname + '/categories/' + itemID,
        responseType: 'json',
        data: newCategoryData,
        headers: {
            token: getAdminToken()
        }
    });
    return res;
}


const createAuthor = async (author) => {
    const res = await axios({
        method: 'post',
        url: hostname + '/authors/',
        responseType: 'json',
        data: author,
        headers: {
            token: getAdminToken()
        }
    });

    return res;
}

const deleteAuthor = async (itemID) => {
    const res = await axios({
        method: 'delete',
        url: hostname + '/authors/' + itemID,
        responseType: 'json',
        headers: {
            token: getAdminToken()
        }
    });

    return res;
}


const updateAuthor = async (itemID, newAuthorData) => {
    const res = await axios({
        method: 'patch',
        url: hostname + '/authors/' + itemID,
        responseType: 'json',
        data: newAuthorData,
        headers: {
            token: getAdminToken()
        }
    });
    return res;
}


const deleteBook = async (itemID) => {
    const res = await axios({
        method: 'delete',
        url: hostname + '/books/' + itemID,
        responseType: 'json',
        headers: {
            token: getAdminToken()
        }
    });

    return res;
}


const createBook = async (book) => {
    const res = await axios({
        method: 'post',
        url: hostname + '/books/',
        responseType: 'json',
        data: book,
        headers: {
            token: getAdminToken()
        }
    });

    return res;
}



const updateBook = async (itemID, newBookData) => {
    const res = await axios({
        method: 'patch',
        url: hostname + '/books/' + itemID,
        responseType: 'json',
        data: newBookData,
        headers: {
            token: getAdminToken()
        }
    });
    return res;
}

const getCategories = () => {
    return fetch(hostname + '/categories').then(res => res.json());
}

const getAuthors = () => {
    return fetch(hostname + '/authors').then(res => res.json());
}


export default {getCategories, getAuthors, createCategory, deleteCategory, updateCategory, createAuthor, deleteAuthor, updateAuthor, createBook, deleteBook, updateBook};

