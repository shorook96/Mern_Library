
import { useState, useEffect } from 'react';
export default function CategoryNewItem({index, closeAddingNewItemMode, addNewData}){
    
    const [newCategoryData, setNewCategoryData] = useState({_id: '' ,categoryName: ''});    

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