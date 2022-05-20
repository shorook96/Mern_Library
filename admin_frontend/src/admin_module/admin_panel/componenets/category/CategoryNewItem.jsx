
import { useState, useEffect } from 'react';
import axios from 'axios';
import getItemAttributes from '../../../itemAttributes';
import CRUD_services from '../../../services/CRUD_services';

const subPanelName = 'category'


export default function CategoryNewItem({index, closeAddingNewItemMode, reloadList}){
    
    const [newCategoryData, setNewCategoryData] = useState({_id: '' ,categoryName: ''});    


    const addNewData = async (newItemData) => {
        const newItemDataWithoutId = {};

        getItemAttributes(subPanelName).forEach((attribute) => {
            if(attribute.key !== '_id'){
                ///Ignore the key
                newItemDataWithoutId[attribute.key] = newItemData[attribute.key];
            }
        })
        console.log(newItemDataWithoutId);
        try{
            const res = await CRUD_services.createCategory(newItemDataWithoutId);
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

    const submitNewData = (e) => {
        const temp = {...newCategoryData};
        temp.categoryName = e.target.value;
        setNewCategoryData(temp);
    }


    return (
        <tr key={newCategoryData._id} className="table-warning">
            <td>{index + 1}</td>
            <td>{newCategoryData._id}</td>
            <td><input type="text" value={newCategoryData.categoryName} onChange={e => submitNewData(e)} onKeyDown={(e) => {if(e.key === "Enter") addNewData(newCategoryData)}}/></td>
            <td style={{textAlign:'center'}}> 
                <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/5219/5219192.png" alt="submit" width={20} onClick={() => {addNewData(newCategoryData)}}/>
            </td>
            <td style={{textAlign:'center'}}>
                <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="cancel" width={20} onClick={closeAddingNewItemMode} />
            </td>
        </tr>
    );
}