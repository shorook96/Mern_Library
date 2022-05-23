import { useState, useEffect } from 'react';
import CRUD_services from '../../../services/CRUD_services';
import getItemAttributes from '../../../itemAttributes';
import uploadImage from '../../../services/fileUpload'
import { authorSchema } from '../../../Joi_validation/author_validation';
import { iconSrcs } from '../../../globalVariablesAndFunctions';



const subPanelName = 'author'



export default function AuthorItem({data, editedItemID, index, closeEditMode, editAction, reloadList}){
    
    const [newItemData, setNewItemData] = useState({...data});

    useEffect(() => {
        if(data._id === editedItemID){
            setNewItemData(data);
        }
    }, [editedItemID])
    
    const deleteAction = async (itemID) => {
        const confirmaed = window.confirm('Do you want to delete item with id = ' + itemID + '?');
        if(!confirmaed){
            //Early return
            return;
        }

        const res = await CRUD_services.deleteAuthor(itemID);
        if(res.status === 200){
            alert(`Deleted Item with id = ${itemID}`);
        }else{
            alert(res.data.message);
        }
        reloadList();
    }

    const submitEditedItem = async (newItemData) => {
        const newItemDataWithoutId = {};

        getItemAttributes(subPanelName).forEach((attribute) => {
            if(attribute.key !== '_id'){
                newItemDataWithoutId[attribute.key] = newItemData[attribute.key];
            }
        })

        try{
            await authorSchema.validateAsync(newItemDataWithoutId)
        }catch(validationError){
            alert(`Error! \n${validationError.message}`);
            return;
        }


        const itemID = newItemData._id;
        try{
            const res = await CRUD_services.updateAuthor(itemID, newItemDataWithoutId);
            if(res.status === 200){
                reloadList();
                alert('Success');
                closeEditMode();
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

    const handleFileUpload = (url) => {
        updateNewData('photo', url);
    }

    const handleEditAction = () => {
        editAction(data._id);
    }
    
    const handleDeleteAction = () => {
        deleteAction(data._id)
    }

    const getRepresentation = () => {
        if(editedItemID === data._id){
            return(

                <tr key={data._id} className="table-warning">
                    <td key={'index'} className='indexCell'>{index + 1}</td>
                    <td key={'id'} className='idCell'>{data._id}</td>
                    <td key={'firstname'} className='firstnameCell'><input type="text" value={newItemData.firstname} onChange={e => updateNewData('firstName', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") submitEditedItem(newItemData)}}/></td>
                    <td key={'lastname'} className='lastnameCell'><input type="text" value={newItemData.lastname} onChange={e => updateNewData('lastname', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") submitEditedItem(newItemData)}}/></td>
                    <td key={'DOB'} className='DOBCell'><input type="date" value={newItemData.DOB} onChange={e => updateNewData('DOB', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") submitEditedItem(newItemData)}}/></td>
                    <td key={'bio'} className='bioCell'><input type="text" value={newItemData.bio} onChange={e => updateNewData('bio', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") submitEditedItem(newItemData)}}/></td>
                    <td key={'photo'} className='photoCell'><input type="file" value=""  onChange={(e) => {uploadImage(e.target.files[0], handleFileUpload)}} /></td>
                    <td key={'submit'} className='actionButtonCell' style={{textAlign:'center'}}> 
                        <img className="hoverableImage" src={iconSrcs.save} alt="submit" width={20} onClick={() => {submitEditedItem(newItemData)}}/>
                    </td>
                    <td key={'cancel'} className='actionButtonCell' style={{textAlign:'center'}}>
                        <img className="hoverableImage" src={iconSrcs.cancel} alt="cancel" width={20} onClick={closeEditMode} />
                    </td>
                </tr>
            )
        }else{
            return(
                <tr key={data._id} className={index % 2 === 1 ? "table-secondary" : ""} onDoubleClick={handleEditAction}>
                    <td>{index + 1}</td>
                    {
                        getItemAttributes(subPanelName).map((attribute) => <td key={attribute.key} className='itemCell'>{data[attribute.key]}</td>)
                    }
                    <td key={'edit'} style={{textAlign:'center'}}> 
                        <img className="hoverableImage" src={iconSrcs.edit} alt="edit" width={20} onClick={handleEditAction}/>
                    </td>
                    <td key={'delete'} style={{textAlign:'center'}}>
                        <img className="hoverableImage" src={iconSrcs.delete} alt="delete" width={20} onClick={handleDeleteAction}/>
                    </td>
                </tr>
            )
        }
    }

    return (
        getRepresentation()
    );
}