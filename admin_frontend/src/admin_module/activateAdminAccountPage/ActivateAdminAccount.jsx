
import { useState } from 'react';
import {admin_password} from '../Joi_validation/admin_password_validation';
import CRUD_services from './../services/CRUD_services';
import {removeActivationToken} from './../globalVariablesAndFunctions'

export default function ActivateAdminAccount({logOut}){

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handelPasswordChange = (value) => {
        setPassword(value);
    }

    const handelConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
    }


    const handleActivateBtnPress = async (e) => {
        e.preventDefault();
        try{
            await admin_password.validateAsync({password});
            if(password !== confirmPassword){
                throw Error('Password and confirm password must match')
            }
            await CRUD_services.avtivateAdminAccount(password);
            removeActivationToken();
            alert('Activated Succesfully');
            logOut();
        }catch(error){
            alert(error)
        }
        

        
    }

    return(
        <div className="container">
            <div className="d-flex aligns-items-center justify-content-center mg-t-50 ActivateAdminAccount">
                <form className="d-grid gap-3 activationForm">
                    <div className="form-group p-2">
                        <label htmlFor="formGroupExampleInput">Password</label>
                        <input type="password" value={password} className="form-control" id="formGroupExampleInput" placeholder="Password" onChange={(e) => handelPasswordChange(e.target.value)}/>
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="formGroupExampleInput2">Confirm Password</label>
                        <input type="password" value={confirmPassword} className="form-control" id="formGroupExampleInput2" placeholder="Confirm Password" onChange={(e) => handelConfirmPasswordChange(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary p-2 m-2" onClick={(e) => {handleActivateBtnPress(e)}}>Activate</button>
                </form>
            </div>
        </div>
    )
}