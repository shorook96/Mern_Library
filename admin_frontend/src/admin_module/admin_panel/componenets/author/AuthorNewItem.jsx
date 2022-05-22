
import { useState } from 'react';
import getItemAttributes from '../../../itemAttributes';
import CRUD_services from '../../../services/CRUD_services';

const subPanelName = 'author'

export default function AuthorNewItem({index, closeAddingNewItemMode, reloadList}){
    const [newItemData, setNewItemData] = useState({_id: '' ,firstname: '', lastname: '', DOB: Date.now(), bio: '', photo: ''});    

    const addNewData = async (newItemData) => {
        const newItemDataWithoutId = {};

        getItemAttributes(subPanelName).forEach((attribute) => {
            if(attribute.key !== '_id'){
                ///Ignore the key
                newItemDataWithoutId[attribute.key] = newItemData[attribute.key];
            }
        })
        try{
            const res = await CRUD_services.createAuthor(newItemDataWithoutId);
            if(res.status === 200){
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
        console.log(attributeKey);
        console.log(attributeValue);
        console.log(temp);
        setNewItemData(temp);
    }

    return (
        <tr key={newItemData._id} className="table-warning">
            <td key={'index'} className='indexCell'>{index + 1}</td>
            <td key={'id'} className='idCell'>{newItemData._id}</td>
            <td key={'firstname'} className='firstnameCell'><input type="text" value={newItemData.firstname} onChange={e => updateNewData('firstname', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") addNewData(newItemData)}}/></td>
            <td key={'lastname'} className='lastnameCell'><input type="text" value={newItemData.lastname} onChange={e => updateNewData('lastname', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") addNewData(newItemData)}}/></td>
            <td key={'DOB'} className='DOBCell'><input type="date" value={newItemData.DOB} onChange={e => updateNewData('DOB', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") addNewData(newItemData)}}/></td>
            <td key={'bio'} className='bioCell'><input type="text" value={newItemData.bio} onChange={e => updateNewData('bio', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") addNewData(newItemData)}}/></td>
            <td key={'photo'} className='photoCell'><input type="text" value={newItemData.photo} onChange={e => updateNewData('photo', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") addNewData(newItemData)}}/></td>
            <td className='actionButtonCell' style={{textAlign:'center'}}> 
                <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/5219/5219192.png" alt="submit" width={20} onClick={() => {addNewData(newItemData)}}/>
            </td>
            <td className='actionButtonCell' style={{textAlign:'center'}}>
                <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="cancel" width={20} onClick={closeAddingNewItemMode} />
            </td>
        </tr>
    );
}