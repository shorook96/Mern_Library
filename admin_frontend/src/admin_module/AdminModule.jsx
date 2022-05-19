import AdminLogin from "./admin_panel/componenets/adminLogin";
import AdminPanel from "./admin_panel/AdminPanel";
import { useState } from 'react';
import { adminTokenKey } from "./globalVariables";


export default function AdminModule(){
    const [loggedIn, setLoggedIn] = useState(false);

    const logIn = () => {
        setLoggedIn(true);
    }

    const logOut = () => {
        sessionStorage.removeItem(adminTokenKey);
        setLoggedIn(false);
    }

    const getAdminPanel = () => {
        return(
            <AdminPanel logOut = {logOut} />
        )
    }

    const getAdminLogin = () => {
        return(
            <AdminLogin logIn = {logIn}/>
        )
    }

    return(
            loggedIn ? getAdminPanel() : getAdminLogin()
    );
}