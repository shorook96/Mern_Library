import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import CategoryNewItem from './CategoryNewItem';
import ControlBar from './ControlBar'
import React from 'react';
import axios from 'axios';
import {numberOfRowsPerPage} from '../../globalVariables'


const itemAttributes = ['categoryName'];


export default function CategoriesPanel(){
    const [categoriesList, setCategoriesList] = useState([]);
    const [editedItemID, setEditedItemID] = useState('');
    const [addingNewItem, setAddingNewItem] = useState(false);
    const [displayedPage, setDisplayedPage] = useState(0);

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

    const enterAddingMode = () => {
        setAddingNewItem(true);
    }
    
    const closeAddingMode = () => {
        setAddingNewItem(false);
    }


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

    const closeAddingNewItemMode = () => {
        setAddingNewItem(false);
    }

    const addNewData = async (newItemData) => {
        const newItemDataWithoutId = {};

        itemAttributes.forEach((key) => {
            newItemDataWithoutId[key] = newItemData[key];
        })

        try{
            const res = await axios({
                method: 'post',
                url: 'http://localhost:5000/categories/',
                responseType: 'json',
                data: newItemDataWithoutId,
                headers: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2QyMzI0ZGUyOTZlZmY3YjIzNmM1NCIsInVzZXJuYW1lIjoiaW1rb3J0YW0iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NTI2MzE2MDN9.sp2P-xWQKzCNmtXyHUT47kj5C2WhOL1tBJFyLgl70L4'
                }
            });
            if(res.status === 200){
                reloadList();
                alert('Success');
                closeAddingMode();
            }else{
                alert(res.data.message);
            }
            
        }catch(error){
            alert(error.response.data.message);
        }
        
        
    }

    const changeDisplayedPage = (pageNumber) => {
        setDisplayedPage(pageNumber);
    }


    const getTableBody = () => {
        if(addingNewItem){
            return(
                <CategoryNewItem
                    index={0}
                    closeAddingNewItemMode = {closeAddingNewItemMode}
                    addNewData = {addNewData}
                />
            );
        }else{
            const diplayedList = [];
            for(let i = displayedPage * numberOfRowsPerPage; i < Math.min(categoriesList.length, (displayedPage + 1) * numberOfRowsPerPage); i++){
                diplayedList.push(categoriesList[i]);
            }
            
            return(
                //{categoryData, editedItemID, index, closeEditMode, editAction, deleteAction}
                
                diplayedList.map((category, index) => (
                    <CategoryItem  
                        key={category._id}
                        categoryData={category}
                        index = {index + displayedPage * numberOfRowsPerPage}
                        editedItemID = {editedItemID}
                        closeEditMode = {closeEditMode}
                        editAction = {editAction}
                        deleteAction = {deleteAction}
                        submitEditedItem = {submitEditedItem}
                        
                    />)
                )
            );
        }
    }

    

    return (
        <>
        
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
                        getTableBody()
                    }

                </tbody>
            </table>
            {addingNewItem? <></> : <ControlBar pagesCount = {Math.ceil(categoriesList.length / numberOfRowsPerPage)} changeDisplayedPage = {changeDisplayedPage} reloadList = {reloadList}/>}
            <img className="position-fixed bottom-0 end-0 addNewItemButton" src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Add New Item" width={70} onClick = {enterAddingMode}/>
        </>
            
        
    );
}
