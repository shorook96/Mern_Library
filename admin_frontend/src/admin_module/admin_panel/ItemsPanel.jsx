import { useState } from 'react';
import { useEffect } from 'react';
import CategoryItem from './componenets/category/CategoryItem';
import CategoryNewItem from './componenets/category/CategoryNewItem';
import ControlBar from './ControlBar'
import React from 'react';
import {numberOfRowsPerPage} from '../globalVariablesAndFunctions'
import {getList} from '../services/dataFetchService'

import getItemAttributes from '../itemAttributes'
import AuthorItem from './componenets/author/AuthorItem';
import AuthorNewItem from './componenets/author/AuthorNewItem';
import BookItem from './componenets/book/BookItem';
import BookNewItem from './componenets/book/BookNewItem'


export default function ItemsPanel({activeSubPanel}){
    const [itemsList, setItemsList] = useState([]);
    const [editedItemID, setEditedItemID] = useState('');
    const [addingNewItem, setAddingNewItem] = useState(false);
    const [displayedPage, setDisplayedPage] = useState(0);
    

    const reloadList = () => {
        getList(activeSubPanel).then( (list) => {
            setItemsList(list);
        })
    }


    useEffect(() => {
        reloadList();
    }, [])


    useEffect(() => {
        closeAddingNewItemMode();
        closeEditMode();
        reloadList();
    }, [activeSubPanel])

    useEffect(() => {
        closeEditMode();
    },[addingNewItem])

    const enterAddingMode = () => {
        setAddingNewItem(true);
    }

    const closeAddingNewItemMode = () => {
        setAddingNewItem(false);
    }

    const editAction = (itemID) => {
        if(editedItemID === ''){
            setEditedItemID(itemID);
        }
    }
    
    const closeEditMode = () => {
        setEditedItemID('');
    }
    

    const changeDisplayedPage = (pageNumber) => {
        setDisplayedPage(pageNumber);
    }

    const getAddingNewItemStructure = () => {
        let ret;
        switch(activeSubPanel){
            case 'category':
                ret = (
                    <CategoryNewItem
                        index={0}
                        closeAddingNewItemMode = {closeAddingNewItemMode}
                        reloadList = {reloadList}
                    />
                )
                break;
            
            case 'author':
                ret = (
                    <AuthorNewItem
                        index={0}
                        closeAddingNewItemMode = {closeAddingNewItemMode}
                        reloadList = {reloadList}
                    />
                )
                break;
                
            case 'book':
                ret =   (
                    <BookNewItem 
                        index={0}
                        closeAddingNewItemMode = {closeAddingNewItemMode}
                        reloadList = {reloadList}                    
                    />)
                break;
            default:
                break;

        }
        return ret;
    }

    const getItem = (key, data, index, editedItemID, closeEditMode, editAction, reloadList) => {
        let ret;
        switch(activeSubPanel){
            case 'category':
                ret = (
                    <CategoryItem 
                        key={key}
                        data={data}
                        index={index}
                        editedItemID = {editedItemID}
                        closeEditMode = {closeEditMode}
                        editAction = {editAction}
                        reloadList = {reloadList}
                    />
                )
                break;
            case 'author':
                ret = (
                    <AuthorItem 
                        key={key}
                        data={data}
                        index={index}
                        editedItemID = {editedItemID}
                        closeEditMode = {closeEditMode}
                        editAction = {editAction}
                        reloadList = {reloadList}
                    />
                )
                break;
            case 'book':
                ret = (
                    <BookItem 
                            key={key}
                            data={data}
                            index={index}
                            editedItemID = {editedItemID}
                            closeEditMode = {closeEditMode}
                            editAction = {editAction}
                            reloadList = {reloadList}
                    />
                );
                break;
            default:
                break;

        }
        return ret;
    }


    const getTableBody = () => {
        if(addingNewItem){
            return(
                getAddingNewItemStructure()
            );
        }else{
            const diplayedList = [];
            for(let i = displayedPage * numberOfRowsPerPage; i < Math.min(itemsList.length, (displayedPage + 1) * numberOfRowsPerPage); i++){
                diplayedList.push(itemsList[i]);
            }
            return diplayedList.map((item, index) => getItem(item._id, item, index + displayedPage * numberOfRowsPerPage, editedItemID, closeEditMode, editAction, reloadList));
        }
    }

    const getPaddingData = () => {
        let paddingArray = [];
        let numberOfRowsInLastPage = itemsList.length % numberOfRowsPerPage;
        if(addingNewItem){
            numberOfRowsInLastPage = 10;
        }
        const numberOfRowsToPutPadding = (numberOfRowsPerPage - numberOfRowsInLastPage) % numberOfRowsPerPage;
        for(let i = 0; i < numberOfRowsToPutPadding; i++){
            paddingArray.push(<tr key={i} className='dummyRow'><th className='dummyRow'>s</th></tr>);
        }
        return paddingArray;
    }

    

    return (
        <>
            <table className="table table-striped table-hover itemsTable">
                <thead>
                    <tr className="table-primary">
                        <th>#</th>
                        {
                            getItemAttributes(activeSubPanel).map(attribute => <th className='itemCell' key={attribute.key}>{attribute.alias}</th>)
                        }
                        <th colSpan={"2"} style={{textAlign:'center'}}>Database Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getTableBody()
                    }

                    {
                        displayedPage == (Math.ceil(itemsList.length / numberOfRowsPerPage) - 1)? getPaddingData() : <></>
                    }

                </tbody>
            </table>
            {addingNewItem? <></> : <ControlBar pagesCount = {Math.ceil(itemsList.length / numberOfRowsPerPage)} changeDisplayedPage = {changeDisplayedPage} reloadList = {reloadList}/>}
            <img className="position-fixed bottom-0 end-0 addNewItemButton" src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Add New Item" width={70} onClick = {enterAddingMode}/>
        </>        
    );
}
