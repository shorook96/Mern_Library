
import { useState } from 'react';
import { iconSrcs } from '../../../globalVariablesAndFunctions';
import { newAdminSchema } from '../../../Joi_validation/admin_validation';
import CRUD_services from '../../../services/CRUD_services';


const subPanelName = 'admin'

export default function AdminNewItem({index, closeAddingNewItemMode, reloadList}){
    const [newItemData, setNewItemData] = useState({_id: '' ,username: '', email: ''});    

    const addNewData = async (newItemData) => {
        const {email, username} = newItemData;
        const newItemDataWithoutId = {email, username};
        try{
            await newAdminSchema.validateAsync(newItemDataWithoutId)
        }catch(validationError){
            alert(`Error! \n${validationError.message}`);
            return;
        }

        try{
            const res = await CRUD_services.createAdmin(newItemDataWithoutId);
            if(res.status === 201){
                reloadList();
                alert('Success');
                closeAddingNewItemMode();
            }else{
                alert(res.data.message);
            }
            
        }catch(error){
            alert(error.response.data.message);
        }
    }

    const updateNewData = (attributeKey, attributeValue) => {
        const temp = {...newItemData};
        temp[attributeKey] = attributeValue;
        setNewItemData(temp);
    }


    return (
        <tr key={newItemData._id} className="table-warning">
            <td key={'index'} className='indexCell'>{index + 1}</td>
            <td key={'id'} className='idCell'>{newItemData._id}</td>
            <td key={'email'} className='emailCell'><input type="text" value={newItemData.email} onChange={e => updateNewData('email', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") addNewData(newItemData)}}/></td>
            <td key={'username'} className='usernameCell'><input type="text" value={newItemData.username} onChange={e => updateNewData('username', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") addNewData(newItemData)}}/></td>
            <td className='actionButtonCell' style={{textAlign:'center'}}> 
                <img className="hoverableImage" src={iconSrcs.save} alt="submit" width={20} onClick={() => {addNewData(newItemData)}}/>
            </td>
            <td className='actionButtonCell' style={{textAlign:'center'}}>
                <img className="hoverableImage" src={iconSrcs.cancel} alt="cancel" width={20} onClick={closeAddingNewItemMode} />
            </td>
        </tr>
    );
}