import {getActivationToken, getAdminToken, hostname} from '../globalVariablesAndFunctions'; 
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


const createAdmin = async (admin) => {
    const res = await axios({
        method: 'post',
        url: hostname + '/admin/',
        responseType: 'json',
        data: admin,
        headers: {
            token: getAdminToken()
        }
    });

    return res;
}

const deleteAdmin = async (itemID) => {
    let res;
    try{
        res = await axios({
            method: 'delete',
            url: hostname + '/admin/' + itemID,
            responseType: 'json',
            headers: {
                token: getAdminToken()
            }
        });
    }catch(error){
        res = error.response;
    }finally{
        return res;
    }

}

const avtivateAdminAccount = async (password) => {
    let res;
    try{
        res = await axios({
            method: 'post',
            url: hostname + '/admin/activate',
            responseType: 'json',
            data: {
                password
            },
            headers: {
                token: getActivationToken()
            }
        });
    }catch(error){
        res = error.response;
    }finally{
        return res;
    }
}

const CRUD_services = {getCategories, getAuthors, createCategory, deleteCategory, updateCategory, createAuthor, deleteAuthor, updateAuthor, createBook, deleteBook, updateBook, createAdmin, deleteAdmin, avtivateAdminAccount};

export default CRUD_services;