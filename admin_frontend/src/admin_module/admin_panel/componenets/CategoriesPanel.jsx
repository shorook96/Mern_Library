import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import React from 'react';
import axios from 'axios';


const itemAttributes = ['categoryName'];


export default function CategoriesPanel(){
    const [categoriesList, setCategoriesList] = useState([]);
    const [editedItemID, setEditedItemID] = useState('');

    const reloadList = () => {
        fetch('http://localhost:5000/categories').then((res) => res.json()).then((resCat) => {
            setCategoriesList(resCat)
        })
    }


    useEffect(() => {
        reloadList();
    }, [])

    /* useEffect( () => {
         axios({
            method: 'get',
            url: ' http://localhost:5000/categories',
            responseType: 'json'
        }).then((response) => {
            setCategoriesList(response.response);
            console.log('Res: ');
            console.log(response.data);
            console.log('List: ');
            console.log(categoriesList);
        })
    }, []) */


    const closeEditMode = () => {
        setEditedItemID('');
    }
    
    const editAction = (itemID) => {
        setEditedItemID(itemID);
    }

    const deleteAction = async (itemID) => {
        const confirmaed = window.confirm('Do you want to delete category with id = ' + itemID + '?');
        if(!confirmaed){
            //Early return
            return;
        }

        const res = await axios({
            method: 'delete',
            url: 'http://localhost:5000/categories/' + itemID,
            responseType: 'json',
            headers: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2QyMzI0ZGUyOTZlZmY3YjIzNmM1NCIsInVzZXJuYW1lIjoiaW1rb3J0YW0iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NTI2MzE2MDN9.sp2P-xWQKzCNmtXyHUT47kj5C2WhOL1tBJFyLgl70L4'
            }
        });
        if(res.status == 200){
            alert(`Deleted Item with id = ${itemID}`);
        }else{
            alert(res.data.message);
        }
        reloadList();
    }

    const submitEditedItem = async (newItemData) => {
        const newItemDataWithoutId = {};
        const objectKeys = Object.keys(newItemData);

        itemAttributes.forEach((key) => {
            newItemDataWithoutId[key] = newItemData[key];
        })

        const itemID = newItemData._id;
        try{
            const res = await axios({
                method: 'patch',
                url: 'http://localhost:5000/categories/' + itemID,
                responseType: 'json',
                data: newItemDataWithoutId,
                headers: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2QyMzI0ZGUyOTZlZmY3YjIzNmM1NCIsInVzZXJuYW1lIjoiaW1rb3J0YW0iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NTI2MzE2MDN9.sp2P-xWQKzCNmtXyHUT47kj5C2WhOL1tBJFyLgl70L4'
                }
            });
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
    

    return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr className="table-dark">
                        <th>#</th>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th colSpan={"2"} style={{textAlign:'center'}}>Database Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //{categoryData, editedItemID, index, closeEditMode, editAction, deleteAction}
                        categoriesList.map((category, index) => (
                            <CategoryItem  
                                key={category._id}
                                categoryData={category}
                                index = {index}
                                editedItemID = {editedItemID}
                                closeEditMode = {closeEditMode}
                                editAction = {editAction}
                                deleteAction = {deleteAction}
                                submitEditedItem = {submitEditedItem}
                                
                            />)
                        )
                    }
                    {

                        /* categoriesList.map((category, index) => (
                            <tr key={category._id} className={index % 2 == 0 ? "table-secondary" : ""}>
                                <td>{index + 1}</td>
                                <td>{category._id}</td>
                                <td>{category.categoryName}</td>
                                <td style={{textAlign:'center'}}> 
                                    <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/650/650194.png" alt="edit" width={20}/>
                                </td>
                                <td style={{textAlign:'center'}}>
                                    <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/3141/3141684.png" alt="delete" width={20}/>
                                </td>
                            </tr>
                        ))
                         */
                    }
                </tbody>
            </table>
        
    );
}
