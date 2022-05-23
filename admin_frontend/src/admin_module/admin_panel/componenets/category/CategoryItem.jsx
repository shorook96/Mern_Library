
import { useState, useEffect } from 'react';
import CRUD_services from '../../../services/CRUD_services';
import getItemAttributes from '../../../itemAttributes';
import { categorySchema } from '../../../Joi_validation/category_validation';
import { iconSrcs } from '../../../globalVariablesAndFunctions';


const subPanelName = 'category'

export default function CategoryItem({data: categoryData, editedItemID, index, closeEditMode, editAction, reloadList}){
    
    const [newCategoryData, setNewCategoryData] = useState({...categoryData});

    useEffect(() => {
        if(categoryData._id === editedItemID){
            setNewCategoryData(categoryData);
        }
    }, [editedItemID])
    

    const deleteAction = async (itemID) => {
        const confirmaed = window.confirm('Do you want to delete item with id = ' + itemID + '?');
        if(!confirmaed){
            //Early return
            return;
        }

        const res = await CRUD_services.deleteCategory(itemID);
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
        });

        try{
            await categorySchema.validateAsync(newItemDataWithoutId)
        }catch(validationError){
            alert(`Error! \n${validationError.message}`);
            return;
        }

        const itemID = newItemData._id;
        try{
            const res = await CRUD_services.updateCategory(itemID, newItemDataWithoutId);
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

    const updateNewData = (e) => {
        const temp = {...newCategoryData};
        temp.categoryName = e.target.value;
        setNewCategoryData(temp);
    }

    const handleEditAction = () => {
        editAction(categoryData._id);
    }
    
    const handleDeleteAction = () => {
        deleteAction(categoryData._id)
    }

    const getRepresentation = () => {
        if(editedItemID === categoryData._id){
            return(

                <tr key={categoryData._id} className="table-warning">
                    <td>{index + 1}</td>
                    <td>{categoryData._id}</td>
                    <td><input type="text" value={newCategoryData.categoryName} onChange={e => updateNewData(e)} onKeyDown={(e) => {if(e.key === "Enter") submitEditedItem(newCategoryData)}}/></td>
                    <td style={{textAlign:'center'}}> 
                        <img className="hoverableImage" src={iconSrcs.save} alt="submit" width={20} onClick={() => {submitEditedItem(newCategoryData)}}/>
                    </td>
                    <td style={{textAlign:'center'}}>
                        <img className="hoverableImage" src={iconSrcs.cancel} alt="cancel" width={20} onClick={closeEditMode} />
                    </td>
                </tr>
            )
        }else{
            return(
                <tr key={categoryData._id} className={index % 2 === 1 ? "table-secondary" : ""} onDoubleClick={handleEditAction}>
                    <td>{index + 1}</td>
                    <td>{categoryData._id}</td>
                    <td>{categoryData.categoryName}</td>
                    <td style={{textAlign:'center'}}> 
                        <img className="hoverableImage" src={iconSrcs.edit} alt="edit" width={20} onClick={handleEditAction}/>
                    </td>
                    <td style={{textAlign:'center'}}>
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