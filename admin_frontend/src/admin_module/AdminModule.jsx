import AdminLogin from "./adminLogin/adminLogin";
import AdminPanel from "./admin_panel/AdminPanel";
import { useState, useEffect } from 'react';
import { adminTokenKey, getAdminToken, setAdminToken, removeAdminToken } from "./globalVariablesAndFunctions";


export default function AdminModule(){
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = getAdminToken();
        if(token){
            logIn();
        }
    }, [])

    const logIn = () => {
        setLoggedIn(true);
    }

    const logOut = () => {
        removeAdminToken();
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