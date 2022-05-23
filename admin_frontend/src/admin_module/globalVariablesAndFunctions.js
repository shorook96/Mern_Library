const adminTokenKey = 'GoodReads_AdminToken';
const numberOfRowsPerPage = 10;
const hostname = 'http://localhost:5000';


const getAdminToken = () => {
    return sessionStorage.getItem(adminTokenKey);
}

const setAdminToken = (token) => {
    sessionStorage.setItem(adminTokenKey, token)
}

const removeAdminToken = () => {
    sessionStorage.removeItem(adminTokenKey);
}


module.exports = {adminTokenKey, numberOfRowsPerPage, getAdminToken, setAdminToken, removeAdminToken, hostname};