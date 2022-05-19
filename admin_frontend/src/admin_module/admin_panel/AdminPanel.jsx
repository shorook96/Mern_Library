import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import AdminNavBar from './AdminNavBar';
import CategoriesPanel from './componenets/CategoriesPanel';
import AuthorsPanel from './componenets/AuthorsPanel';
import BooksPanel from './componenets/BooksPanel';

const adminSubPanelsIDs = {
    categories: 0,
    books: 1,
    authors: 2
}


export default function ({logOut}){
    const [activeSubPanelID, setActiveSubPanelID] = useState(adminSubPanelsIDs.categories);
    
    const getCurrentActivePanel = () => {
        let activeSubPanel = null;
        switch(activeSubPanelID){
            case adminSubPanelsIDs.categories:
                activeSubPanel = (<CategoriesPanel/>);
                break;
            
            case adminSubPanelsIDs.books:
                activeSubPanel = (<BooksPanel/>);
                break;
            
            case adminSubPanelsIDs.authors:
                activeSubPanel = (<AuthorsPanel/>);
                break;
            default:
                activeSubPanel = (<CategoriesPanel/>);
                break;
        }

        return activeSubPanel;
    }
    const handleSubPanelChange = (tabID) => {setActiveSubPanelID(tabID)};

    return (
        <>
            <AdminNavBar logOut = {logOut} activeSubPanelID = {activeSubPanelID} changeTab = {handleSubPanelChange} />
            <br />
            <div className='container'>
                {getCurrentActivePanel()}
            </div>
        </>
    )
}