import AdminLogin from "./adminLogin/adminLogin";
import AdminPanel from "./admin_panel/AdminPanel";
import { useState, useEffect } from 'react';
import { adminTokenKey, getAdminToken, setAdminToken, removeAdminToken, getActivationToken} from "./globalVariablesAndFunctions";
import ActivateAdminAccount from "./activateAdminAccountPage/ActivateAdminAccount";


export default function AdminModule(){
    const [loggedIn, setLoggedIn] = useState(false);
    const [activatedAccount, setActivatedAccount] = useState(false);

    useEffect(() => {
        const token = getAdminToken();
        const activationToken = getActivationToken();
        if(token){
            setAccountActiveStatus(true);
            logIn();
        }else if(activationToken){
            setAccountActiveStatus(false);
            logIn();
        }else{
            setAccountActiveStatus(false);
            logOut();
        }
    }, [])

    const logIn = () => {
        setLoggedIn(true);
    }

    const logOut = () => {
        removeAdminToken();
        setLoggedIn(false);
    }

    const setAccountActiveStatus = (status) => {
        setActivatedAccount(status);
    }


    const getAdminPanel = () => {
        return(
            <AdminPanel logOut = {logOut} />
        )
    }

    const getAdminLogin = () => {
        return(
            <AdminLogin logIn = {logIn} setAccountActiveStatus = {setAccountActiveStatus} />
        )
    }

    const getActivateAccountPage = () => {
        return(
            <ActivateAdminAccount logOut = {logOut}/>
        )
    }

    const getContent = () => {
        if(loggedIn){
            if(activatedAccount){
                return getAdminPanel();
            }else{
                return getActivateAccountPage();
            }
        }else{
            return getAdminLogin()
        }
    }

    return(
        getContent()
    );
}