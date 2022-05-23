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


const publicDirectorySrc = process.env.PUBLIC_URL

//save image src: https://cdn-icons-png.flaticon.com/512/5219/5219192.png
//cancel image src: https://cdn-icons-png.flaticon.com/512/1828/1828843.png
//edit image src: https://cdn-icons-png.flaticon.com/512/650/650194.png
//delete image src: https://cdn-icons-png.flaticon.com/512/3141/3141684.png

const iconSrcs = {
    edit: publicDirectorySrc + '/assets/icons/edit.png',
    save: publicDirectorySrc + '/assets/icons/save.png',
    delete: publicDirectorySrc + '/assets/icons/delete.png',
    cancel: publicDirectorySrc + '/assets/icons/cancel.png'
}

module.exports = {adminTokenKey, numberOfRowsPerPage, getAdminToken, setAdminToken, removeAdminToken, hostname, iconSrcs};