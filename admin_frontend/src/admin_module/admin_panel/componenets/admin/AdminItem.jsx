import { useState, useEffect } from 'react';
import CRUD_services from '../../../services/CRUD_services';
import getItemAttributes from '../../../itemAttributes';
import uploadImage from '../../../services/fileUpload'
import { authorSchema } from '../../../Joi_validation/author_validation';
import { iconSrcs } from '../../../globalVariablesAndFunctions';



const subPanelName = 'admin'



export default function AdminItem({data, index, reloadList}){

    const deleteAction = async (itemID) => {
        const confirmaed = window.confirm('Do you want to delete item with id = ' + itemID + '?');
        if(!confirmaed){
            //Early return
            return;
        }
        try{
            const res = await CRUD_services.deleteAdmin(itemID);
            if(res.status === 200){
                alert(`Deleted Item with id = ${itemID}`);
            }else{
                alert(res.data.message);
            }
            reloadList();
        }catch(error){
            alert(error.message)
        }
    }

    const handleDeleteAction = () => {
        deleteAction(data._id)
    }

    const getRepresentation = () => {
        return(
            <tr key={data._id} className={index % 2 === 1 ? "table-secondary" : ""} >
                <td>{index + 1}</td>
                <td key="id" className='idCell'>{data._id}</td>
                <td key="email" className='emailCell'>{data.email}</td>
                <td key="username" className='usernameCell'>{data.username}</td>
                <td key="isActive" className='isActiveCell'>{data.isActive? 'TRUE' : 'FALSE'}</td>
                <td key={'delete'} colSpan="2" style={{textAlign:'center'}}>
                    <img className="hoverableImage" src={iconSrcs.delete} alt="delete" width={20} onClick={handleDeleteAction}/>
                </td>
            </tr>
        )
    }

    return (
        getRepresentation()
    );
}