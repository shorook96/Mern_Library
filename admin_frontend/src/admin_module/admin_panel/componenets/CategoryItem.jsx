
import { useState, useEffect } from 'react';
export default function CategoryItem({categoryData, editedItemID, index, closeEditMode, editAction, deleteAction, submitEditedItem}){
    
    const [newCategoryData, setNewCategoryData] = useState({...categoryData});

    useEffect(() => {
        setNewCategoryData(categoryData);
    }, [editedItemID])
    

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
                        <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/5219/5219192.png" alt="submit" width={20} onClick={() => {submitEditedItem(newCategoryData)}}/>
                    </td>
                    <td style={{textAlign:'center'}}>
                        <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="cancel" width={20} onClick={closeEditMode} />
                    </td>
                </tr>
            )
        }else{
            return(
                <tr key={categoryData._id} className={index % 2 == 1 ? "table-secondary" : ""} onDoubleClick={handleEditAction}>
                    <td>{index + 1}</td>
                    <td>{categoryData._id}</td>
                    <td>{categoryData.categoryName}</td>
                    <td style={{textAlign:'center'}}> 
                        <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/650/650194.png" alt="edit" width={20} onClick={handleEditAction}/>
                    </td>
                    <td style={{textAlign:'center'}}>
                        <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/3141/3141684.png" alt="delete" width={20} onClick={handleDeleteAction}/>
                    </td>
                </tr>
            )
        }
    }

    return (
        getRepresentation()
    );
}